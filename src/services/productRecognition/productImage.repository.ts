import type{
  CreateProductImageInput,
  ProductImage,
  ProductImageRepository,
  UpdateProductImageInput,
}from "../../types/productImage.types";

function createId():string{
  return`product-image-${Date.now()}-${Math.random().toString(36).slice(2,10)}`;
}

function requireUri(uri:string):string{
  const value=uri.trim();
  if(!value)throw new Error("Product image URI is required.");
  return value;
}

export class InMemoryProductImageRepository implements ProductImageRepository{
  private readonly images=new Map<string,ProductImage>();

  create(input:CreateProductImageInput):ProductImage{
    const now=new Date().toISOString();
    const image:ProductImage={
      id:createId(),
      productId:input.productId,
      recognitionId:input.recognitionId,
      uri:requireUri(input.uri),
      type:input.type,
      source:input.source,
      isPrimary:input.isPrimary??false,
      width:input.width,
      height:input.height,
      mimeType:input.mimeType,
      fileName:input.fileName,
      createdAt:now,
      updatedAt:now,
    };
    if(image.isPrimary&&image.productId!==undefined){
      this.clearPrimary(image.productId);
    }
    this.images.set(image.id,image);
    return image;
  }

  update(input:UpdateProductImageInput):ProductImage{
    const existing=this.images.get(input.id);
    if(!existing)throw new Error("Product image was not found.");
    const productId=input.productId??existing.productId;
    if(input.isPrimary&&productId!==undefined){
      this.clearPrimary(productId,input.id);
    }
    const updated:ProductImage={
      ...existing,
      ...input,
      productId,
      uri:input.uri===undefined
        ?existing.uri
        :requireUri(input.uri),
      updatedAt:new Date().toISOString(),
    };
    this.images.set(updated.id,updated);
    return updated;
  }

  getById(id:string):ProductImage|undefined{
    return this.images.get(id);
  }

  getByProductId(productId:number|string):ProductImage[]{
    return[...this.images.values()]
      .filter(image=>image.productId===productId)
      .sort((a,b)=>
        Number(b.isPrimary)-Number(a.isPrimary)||
        a.createdAt.localeCompare(b.createdAt)
      );
  }

  getByRecognitionId(recognitionId:string):ProductImage[]{
    return[...this.images.values()]
      .filter(image=>image.recognitionId===recognitionId)
      .sort((a,b)=>a.createdAt.localeCompare(b.createdAt));
  }

  getPrimary(productId:number|string):ProductImage|undefined{
    return this.getByProductId(productId)
      .find(image=>image.isPrimary);
  }

  delete(id:string):boolean{
    return this.images.delete(id);
  }

  setPrimary(id:string):ProductImage{
    const image=this.images.get(id);
    if(!image)throw new Error("Product image was not found.");
    if(image.productId===undefined){
      throw new Error("Product image must be assigned to a product.");
    }
    this.clearPrimary(image.productId,id);
    return this.update({
      id,
      isPrimary:true,
    });
  }

  private clearPrimary(
    productId:number|string,
    excludedId?:string,
  ):void{
    for(const image of this.images.values()){
      if(
        image.id===excludedId||
        image.productId!==productId||
        !image.isPrimary
      )continue;
      this.images.set(image.id,{
        ...image,
        isPrimary:false,
        updatedAt:new Date().toISOString(),
      });
    }
  }
}

export const productImageRepository=
  new InMemoryProductImageRepository();