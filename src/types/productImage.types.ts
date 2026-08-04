export type ProductImageType=
  |"front"
  |"back"
  |"barcode"
  |"nutrition-facts"
  |"ingredients"
  |"other";

export type ProductImageSource=
  |"camera"
  |"gallery"
  |"recognition";

export interface ProductImage{
  id:string;
  productId?:number|string;
  recognitionId?:string;
  uri:string;
  type:ProductImageType;
  source:ProductImageSource;
  isPrimary:boolean;
  width?:number;
  height?:number;
  mimeType?:string;
  fileName?:string;
  createdAt:string;
  updatedAt:string;
}

export interface CreateProductImageInput{
  productId?:number|string;
  recognitionId?:string;
  uri:string;
  type:ProductImageType;
  source:ProductImageSource;
  isPrimary?:boolean;
  width?:number;
  height?:number;
  mimeType?:string;
  fileName?:string;
}

export interface UpdateProductImageInput{
  id:string;
  productId?:number|string;
  type?:ProductImageType;
  isPrimary?:boolean;
  uri?:string;
  width?:number;
  height?:number;
  mimeType?:string;
  fileName?:string;
}

export interface ProductImageRepository{
  create(input:CreateProductImageInput):ProductImage;
  update(input:UpdateProductImageInput):ProductImage;
  getById(id:string):ProductImage|undefined;
  getByProductId(productId:number|string):ProductImage[];
  getByRecognitionId(recognitionId:string):ProductImage[];
  getPrimary(productId:number|string):ProductImage|undefined;
  delete(id:string):boolean;
  setPrimary(id:string):ProductImage;
}