import type{ProductMeasurement}from "../../types/productRecognition.types";

interface MeasurementCandidate extends ProductMeasurement{
  score:number;
  index:number;
}

const UNIT_ALIASES:Record<string,string>={
  ml:"mL",
  milliliter:"mL",
  milliliters:"mL",
  millilitre:"mL",
  millilitres:"mL",
  l:"L",
  liter:"L",
  liters:"L",
  litre:"L",
  litres:"L",
  mg:"mg",
  milligram:"mg",
  milligrams:"mg",
  g:"g",
  gram:"g",
  grams:"g",
  kg:"kg",
  kilogram:"kg",
  kilograms:"kg",
  oz:"oz",
  ounce:"oz",
  ounces:"oz",
  lb:"lb",
  lbs:"lb",
  pound:"lb",
  pounds:"lb",
  cl:"cL",
  dl:"dL",
  pc:"pc",
  pcs:"pc",
  piece:"pc",
  pieces:"pc",
  tablet:"tablet",
  tablets:"tablet",
  capsule:"capsule",
  capsules:"capsule",
};

const MEASUREMENT_PATTERN=/\b(\d+(?:[.,]\d+)?)\s*(milliliters?|millilitres?|milligrams?|kilograms?|liters?|litres?|grams?|ounces?|pounds?|tablets?|capsules?|ml|mg|kg|cl|dl|lbs?|oz|g|l|pcs?|pieces?)\b/gi;

const PRIMARY_LABEL_PATTERN=/\b(net\s+(?:content|contents|weight|wt|volume)|contents?|peso\s+neto|total\s+(?:content|weight|volume))\b/i;
const SECONDARY_LABEL_PATTERN=/\b(serving\s+size|per\s+serving|servings?\s+per|dosage|daily\s+value|nutrition\s+facts|recommended\s+dose)\b/i;
const ACTIVE_INGREDIENT_PATTERN=/\b(vitamin|mineral|calcium|iron|zinc|sodium|protein|carbohydrate|sugar|fat|cholesterol|potassium|ingredient|contains?)\b/i;

function normalizeUnit(unit:string):string{
  return UNIT_ALIASES[unit.toLowerCase()]??unit;
}

function normalizeValue(value:string):number{
  return Number(value.replace(",","."));
}

function getLineBounds(text:string,index:number):{start:number;end:number}{
  const start=text.lastIndexOf("\n",index-1)+1;
  const nextBreak=text.indexOf("\n",index);
  return{start,end:nextBreak===-1?text.length:nextBreak};
}

function scoreCandidate(text:string,index:number,rawText:string,unit:string):number{
  const{start,end}=getLineBounds(text,index);
  const line=text.slice(start,end).trim();
  const previousLineStart=text.lastIndexOf("\n",Math.max(0,start-2))+1;
  const previousLine=text.slice(previousLineStart,Math.max(previousLineStart,start-1)).trim();
  const localContext=`${previousLine} ${line}`.trim();
  let score=50;
  if(PRIMARY_LABEL_PATTERN.test(line))score+=60;
  else if(PRIMARY_LABEL_PATTERN.test(previousLine))score+=35;
  if(SECONDARY_LABEL_PATTERN.test(line))score-=70;
  else if(SECONDARY_LABEL_PATTERN.test(previousLine))score-=40;
  if(ACTIVE_INGREDIENT_PATTERN.test(line)&&!PRIMARY_LABEL_PATTERN.test(line))score-=25;
  if(unit==="tablet"||unit==="capsule"||unit==="pc")score+=10;
  if(/\b\d+\s*[x×]\s*\d+/i.test(localContext))score-=15;
  if(rawText.length===0)score=0;
  return Math.max(0,Math.min(100,score));
}

export function extractMeasurementCandidates(text:string):MeasurementCandidate[]{
  const candidates:MeasurementCandidate[]=[];
  for(const match of text.matchAll(MEASUREMENT_PATTERN)){
    const rawText=match[0];
    const value=normalizeValue(match[1]);
    const unit=normalizeUnit(match[2]);
    const index=match.index??0;
    if(!Number.isFinite(value)||value<=0)continue;
    candidates.push({
      value,
      unit,
      rawText,
      normalizedValue:value,
      normalizedUnit:unit,
      score:scoreCandidate(text,index,rawText,unit),
      index,
    });
  }
  return candidates.sort((a,b)=>b.score-a.score||a.index-b.index);
}

export function extractPrimaryMeasurement(text:string):ProductMeasurement|undefined{
  const candidate=extractMeasurementCandidates(text)[0];
  if(!candidate||candidate.score<40)return undefined;
  const{score,index,...measurement}=candidate;
  return measurement;
}