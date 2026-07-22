import {BrandCandidate} from "../../types/BrandCandidate";
import {findProductLine} from "./findProductLine";
import {findProductLineByKeyword} from "./findProductLineByKeyword";

export function recognizeProductLine(
  brand:BrandCandidate|undefined,
  text:string
){
  if(!brand)return;

  return(
    findProductLine(brand.brand,text)||
    findProductLineByKeyword(brand.brand,text)
  );
}