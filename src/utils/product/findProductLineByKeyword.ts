// shopper-assistant/src/utils/product/findProductLineByKeyword.ts
import {ProductBrandMetadata} from "../../constants/productBrandMetadata.types";
import {normalize} from "../normalize";

export function findProductLineByKeyword(brand:ProductBrandMetadata,text:string){
  if(!brand.productLines)return;

  const search=normalize(text);

  let best:{name:string;matchedText:string;score:number}|undefined;

  for(const line of Object.values(brand.productLines)){
    for(const keyword of line.keywords??[]){
      const value=normalize(keyword);

      if(value.length<4)continue;
      if(value===normalize(brand.name))continue;

      const matched=
        search===value||
        search.startsWith(value+" ")||
        search.endsWith(" "+value)||
        search.includes(" "+value+" ");

      if(!matched)continue;

      const score=value.length;

      if(!best||score>best.score){
        best={
          name:line.name,
          matchedText:keyword,
          score
        };
      }
    }
  }

  if(!best)return;

  return{
    name:best.name,
    confidence:0.9,
    matchedText:best.matchedText
  };
}