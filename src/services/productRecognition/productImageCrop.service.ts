import{
  ImageManipulator,
  SaveFormat,
}from"expo-image-manipulator";
import type{ProductImageInput}from"../../types/productRecognition.types";

export async function cropProductImage(
  image:ProductImageInput,
):Promise<ProductImageInput>{
  if(!image.width||!image.height)return image;
  const size=Math.round(
    Math.min(image.width,image.height)*0.82,
  );
  const originX=Math.max(
    0,
    Math.round((image.width-size)/2),
  );
  const originY=Math.max(
    0,
    Math.round((image.height-size)/2),
  );
  const context=ImageManipulator.manipulate(image.uri);
  context.crop({
    originX,
    originY,
    width:size,
    height:size,
  });
  const rendered=await context.renderAsync();
  const saved=await rendered.saveAsync({
    compress:0.9,
    format:SaveFormat.JPEG,
  });
  return{
    ...image,
    uri:saved.uri,
    width:saved.width,
    height:saved.height,
    mimeType:"image/jpeg",
    fileName:`product-square-${Date.now()}.jpg`,
  };
}