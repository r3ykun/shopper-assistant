//shopper-assistant\src\utils\brand\selectBestBrand.ts
import {BrandCandidate} from "../../types/BrandCandidate";
import {findBrandOwner} from "./findBrandOwner";

export function selectBestBrand(candidates:BrandCandidate[],text:string){
  if(candidates.length===0)return;

  const owner=findBrandOwner(candidates,text);
  if(owner)return owner;

  candidates.sort((a,b)=>{
    if(b.confidence!==a.confidence)return b.confidence-a.confidence;
    return b.brand.name.length-a.brand.name.length;
  });

  return candidates[0];
}