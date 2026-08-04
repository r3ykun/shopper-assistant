import{database}from "../../database/database";
import type{
  CreateProductImageInput,
  ProductImage,
  ProductImageRepository,
  ProductImageSource,
  ProductImageType,
  UpdateProductImageInput,
}from "../../types/productImage.types";

interface ProductImageRow{
  id:string;
  productId:number|null;
  recognitionId:string|null;
  uri:string;
  type:ProductImageType;
  source:ProductImageSource;
  isPrimary:number;
  width:number|null;
  height:number|null;
  mimeType:string|null;
  fileName:string|null;
  createdAt:string;
  updatedAt:string;
}

function createId():string{
  return`product-image-${Date.now()}-${Math.random().toString(36).slice(2,10)}`;
}

function requireUri(uri:string):string{
  const value=uri.trim();
  if(!value)throw new Error("Product image URI is required.");
  return value;
}

function mapRow(row:ProductImageRow):ProductImage{
  return{
    id:row.id,
    productId:row.productId??undefined,
    recognitionId:row.recognitionId??undefined,
    uri:row.uri,
    type:row.type,
    source:row.source,
    isPrimary:row.isPrimary===1,
    width:row.width??undefined,
    height:row.height??undefined,
    mimeType:row.mimeType??undefined,
    fileName:row.fileName??undefined,
    createdAt:row.createdAt,
    updatedAt:row.updatedAt,
  };
}

export class SQLiteProductImageRepository implements ProductImageRepository{
  create(input:CreateProductImageInput):ProductImage{
    const id=createId();
    const now=new Date().toISOString();
    const isPrimary=input.isPrimary??false;
    if(isPrimary&&input.productId!==undefined){
      this.clearPrimary(input.productId);
    }
    database.runSync(`
      INSERT INTO ProductImages(
        id,productId,recognitionId,uri,type,source,isPrimary,
        width,height,mimeType,fileName,createdAt,updatedAt
      )VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?);
    `,[
      id,
      input.productId??null,
      input.recognitionId??null,
      requireUri(input.uri),
      input.type,
      input.source,
      isPrimary?1:0,
      input.width??null,
      input.height??null,
      input.mimeType??null,
      input.fileName??null,
      now,
      now,
    ]);
    const image=this.getById(id);
    if(!image)throw new Error("Product image could not be created.");
    return image;
  }

  update(input:UpdateProductImageInput):ProductImage{
    const existing=this.getById(input.id);
    if(!existing)throw new Error("Product image was not found.");
    const productId=input.productId??existing.productId;
    const isPrimary=input.isPrimary??existing.isPrimary;
    if(isPrimary&&productId!==undefined){
      this.clearPrimary(productId,input.id);
    }
    database.runSync(`
      UPDATE ProductImages SET
        productId=?,
        uri=?,
        type=?,
        isPrimary=?,
        width=?,
        height=?,
        mimeType=?,
        fileName=?,
        updatedAt=?
      WHERE id=?;
    `,[
      productId??null,
      input.uri===undefined?existing.uri:requireUri(input.uri),
      input.type??existing.type,
      isPrimary?1:0,
      input.width??existing.width??null,
      input.height??existing.height??null,
      input.mimeType??existing.mimeType??null,
      input.fileName??existing.fileName??null,
      new Date().toISOString(),
      input.id,
    ]);
    const updated=this.getById(input.id);
    if(!updated)throw new Error("Product image could not be updated.");
    return updated;
  }

  getById(id:string):ProductImage|undefined{
    const row=database.getFirstSync<ProductImageRow>(`
      SELECT*FROM ProductImages WHERE id=?;
    `,[id]);
    return row?mapRow(row):undefined;
  }

  getByProductId(productId:number|string):ProductImage[]{
    return database.getAllSync<ProductImageRow>(`
      SELECT*FROM ProductImages
      WHERE productId=?
      ORDER BY isPrimary DESC,createdAt ASC;
    `,[productId]).map(mapRow);
  }

  getByRecognitionId(recognitionId:string):ProductImage[]{
    return database.getAllSync<ProductImageRow>(`
      SELECT*FROM ProductImages
      WHERE recognitionId=?
      ORDER BY createdAt ASC;
    `,[recognitionId]).map(mapRow);
  }

  getPrimary(productId:number|string):ProductImage|undefined{
    const row=database.getFirstSync<ProductImageRow>(`
      SELECT*FROM ProductImages
      WHERE productId=?AND isPrimary=1
      LIMIT 1;
    `,[productId]);
    return row?mapRow(row):undefined;
  }

  delete(id:string):boolean{
    const existing=this.getById(id);
    if(!existing)return false;
    database.runSync(`
      DELETE FROM ProductImages WHERE id=?;
    `,[id]);
    return true;
  }

  setPrimary(id:string):ProductImage{
    const image=this.getById(id);
    if(!image)throw new Error("Product image was not found.");
    if(image.productId===undefined){
      throw new Error("Product image must be assigned to a product.");
    }
    this.clearPrimary(image.productId,id);
    return this.update({id,isPrimary:true});
  }

  private clearPrimary(
    productId:number|string,
    excludedId?:string,
  ):void{
    if(excludedId){
      database.runSync(`
        UPDATE ProductImages
        SET isPrimary=0,updatedAt=?
        WHERE productId=?AND isPrimary=1AND id<>?;
      `,[new Date().toISOString(),productId,excludedId]);
      return;
    }
    database.runSync(`
      UPDATE ProductImages
      SET isPrimary=0,updatedAt=?
      WHERE productId=?AND isPrimary=1;
    `,[new Date().toISOString(),productId]);
  }
}

export const sqliteProductImageRepository=
  new SQLiteProductImageRepository();