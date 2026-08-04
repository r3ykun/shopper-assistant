import type{
  NativeOcrRecognizer,
  NativeOcrResponse,
}from "./productOcr.service";

const SAMPLE_TEXT=`NESTLE
CHUCKIE
CHOCOLATE MILK
NET CONTENT 250 mL`;

export const mockProductOcrRecognizer:NativeOcrRecognizer=async():Promise<NativeOcrResponse>=>{
  await new Promise(resolve=>setTimeout(resolve,500));
  return{
    text:SAMPLE_TEXT,
    blocks:SAMPLE_TEXT.split("\n").map((text,index)=>({
      text,
      confidence:0.95,
      boundingBox:{
        x:0,
        y:index*40,
        width:300,
        height:35,
      },
    })),
  };
};