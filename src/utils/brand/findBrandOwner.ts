import {BrandCandidate} from "../../types/BrandCandidate";
import {normalize} from "../normalize";

export function findBrandOwner(candidates:BrandCandidate[],text:string){
  const search=normalize(text);

  let best:BrandCandidate|undefined;
  let bestLength=-1;

  for(const candidate of candidates){
    for(const alias of candidate.brand.aliases??[]){
      const value=normalize(alias.value);

      if(
        search===value||
        search.startsWith(value+" ")||
        search.endsWith(" "+value)||
        search.includes(" "+value+" ")
      ){
        if(value.length>bestLength){
          best=candidate;
          bestLength=value.length;
        }
      }
    }
  }

  return best;
}