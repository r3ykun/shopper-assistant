import fs from "node:fs";
import path from "node:path";

const FILE=path.resolve("src/constants/productBrandMetadata.ts");

const REMOVE=new Set([
  "brand",
  "grocery",
  "food",
  "drink",
  "beverage",
  "coffee",
  "milk",
  "cream",
  "fresh",
  "dairy",
  "instant",
  "caffeine",
  "house",
  "mate",
  "stars",
  "gold",
  "ice",
  "krunch"
]);

let source=fs.readFileSync(FILE,"utf8");

source=source.replace(
  /keywords:\s*\[([\s\S]*?)\]/g,
  (_:string,content:string)=>{
    const keywords:string[]=content
      .split(",")
      .map(s=>s.trim())
      .filter(s=>s.length>0)
      .map(s=>s.replace(/^['"]|['"]$/g,""));

    const cleaned:string[]=[
      ...new Set(
        keywords.filter(s=>{
          const value=s.toLowerCase();
          return value.length>=4&&!REMOVE.has(value);
        })
      )
    ];

    return `keywords:[${cleaned.map(s=>`"${s}"`).join(",")}]`;
  }
);

fs.writeFileSync(FILE,source);

console.log("Done.");