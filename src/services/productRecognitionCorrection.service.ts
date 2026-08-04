import type{
  ProductRecognitionCorrection,
  ProductRecognitionCorrectionLog,
}from"../types/productRecognition.types";

export class ProductRecognitionCorrectionService{
  createLog(
    recognitionId:string,
    original:{
      barcode:string;
      name:string;
      brand:string;
      category:string;
      subcategory:string;
      measurement:string;
      measurementUnit:string;
    },
    updated:{
      barcode:string;
      name:string;
      brand:string;
      category:string;
      subcategory:string;
      measurement:string;
      measurementUnit:string;
    },
  ):ProductRecognitionCorrectionLog{
    const corrections:ProductRecognitionCorrection[]=[];

    const compare=(
      field:keyof typeof original,
    )=>{
      if(original[field]!==updated[field]){
        corrections.push({
          field,
          original:String(original[field]),
          corrected:String(updated[field]),
        });
      }
    };

    compare("barcode");
    compare("name");
    compare("brand");
    compare("category");
    compare("subcategory");
    compare("measurement");
    compare("measurementUnit");

    return{
      recognitionId,
      createdAt:new Date().toISOString(),
      corrections,
    };
  }
}

export const
productRecognitionCorrectionService=
new ProductRecognitionCorrectionService();