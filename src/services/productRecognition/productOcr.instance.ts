import{ProductOcrService}from "./productOcr.service";
import{mlKitProductOcrRecognizer}from "./mlKitProductOcr.provider";

export const productOcrService=
  new ProductOcrService(mlKitProductOcrRecognizer);