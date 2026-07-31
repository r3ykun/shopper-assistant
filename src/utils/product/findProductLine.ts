//shopper-assistant\src\utils\product\findProductLine.ts
import {ProductBrandMetadata,ProductLineAlias} from "../../constants/productBrandMetadata.types";
import {isCategoryCompatible} from "./isCategoryCompatible";
import {normalize} from "../normalize";

export function findProductLine(brand:ProductBrandMetadata,text:string){
  if(!brand.productLines)return;

  const search=normalize(text);
  let best:{name:string;confidence:number;matchedText:string;length:number}|undefined;

  for(const line of Object.values(brand.productLines)){
    const candidates=[
      line.name,
      ...(line.aliases?.map((a:ProductLineAlias)=>a.value)??[])
    ];

    for(const candidate of candidates){
      const normalized=normalize(candidate);

      const matched=
        search===normalized||
        search.startsWith(normalized+" ")||
        search.endsWith(" "+normalized)||
        search.includes(" "+normalized+" ");

      if(!matched)continue;

      if(!best||normalized.length>best.length){
        best={
          name:line.name,
          confidence:1,
          matchedText:candidate,
          length:normalized.length
        };
      }
    }
  }

  if(!best)return;

  return{
    name:best.name,
    confidence:best.confidence,
    matchedText:best.matchedText
  };
}