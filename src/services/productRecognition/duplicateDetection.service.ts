import type{
  DuplicateDetectionResult,
  DuplicateRisk,
  ExtractedProductMetadata,
  ProductMatchCandidate,
}from "../../types/productRecognition.types";

function getRisk(score:number,barcodeMatch:boolean):DuplicateRisk{
  if(barcodeMatch)return"exact";
  if(score>=85)return"high";
  if(score>=60)return"possible";
  return"none";
}

function buildReasons(candidate:ProductMatchCandidate):string[]{
  return candidate.reasons
    .filter(reason=>reason.score>0)
    .map(reason=>reason.description);
}

export function detectDuplicate(
  metadata:ExtractedProductMetadata,
  candidates:ProductMatchCandidate[],
  barcode?:string,
):DuplicateDetectionResult{
  const candidate=candidates[0];
  if(!candidate){
    return{
      risk:"none",
      score:0,
      reasons:[],
    };
  }

  const barcodeMatch=Boolean(
    barcode&&
    candidate.barcode&&
    barcode===candidate.barcode
  );

  const risk=getRisk(candidate.score,barcodeMatch);

  return{
    risk,
    score:barcodeMatch?1:candidate.score/100,
    candidate:risk==="none"?undefined:candidate,
    reasons:risk==="none"?[]:buildReasons(candidate),
  };
}

export function detectDuplicates(
  metadata:ExtractedProductMetadata,
  candidates:ProductMatchCandidate[],
  barcode?:string,
):DuplicateDetectionResult[]{
  return candidates.map(candidate=>{
    const barcodeMatch=Boolean(
      barcode&&
      candidate.barcode&&
      barcode===candidate.barcode
    );

    const risk=getRisk(candidate.score,barcodeMatch);

    return{
      risk,
      score:barcodeMatch?1:candidate.score/100,
      candidate:risk==="none"?undefined:candidate,
      reasons:risk==="none"?[]:buildReasons(candidate),
    };
  });
}