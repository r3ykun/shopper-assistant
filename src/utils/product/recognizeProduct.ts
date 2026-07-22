import {ProductRecognitionResult} from "../../types/ProductRecognitionResult";
import {recognizeBrand} from "../brand/recognizeBrand";
import {selectBestBrand} from "../brand/selectBestBrand";
import {recognizeProductLine} from "./recognizeProductLine";
import {findVariant} from "./findVariant";

export function recognizeProduct(text:string):ProductRecognitionResult{
  const candidates=recognizeBrand(text);
  const brand=selectBestBrand(candidates,text);
  const productLine=recognizeProductLine(brand,text);
  const variant=brand?findVariant(
    brand.brand,
    productLine?.productLine,
    text
  ):undefined;
  return{
    brand,
    productLine,
    variant
  };
}