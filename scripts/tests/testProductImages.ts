import{
  InMemoryProductImageRepository,
}from "../../src/services/productRecognition";

const repository=new InMemoryProductImageRepository();

const front=repository.create({
  productId:1,
  recognitionId:"recognition-1",
  uri:"mock://front-image",
  type:"front",
  source:"camera",
  isPrimary:true,
  width:1080,
  height:1920,
  mimeType:"image/jpeg",
});

const back=repository.create({
  productId:1,
  recognitionId:"recognition-1",
  uri:"mock://back-image",
  type:"back",
  source:"camera",
});

const barcode=repository.create({
  productId:1,
  recognitionId:"recognition-1",
  uri:"mock://barcode-image",
  type:"barcode",
  source:"camera",
});

console.log("CREATED");
console.dir({front,back,barcode},{depth:null});

console.log("\nPRODUCT IMAGES");
console.dir(repository.getByProductId(1),{depth:null});

console.log("\nPRIMARY");
console.dir(repository.getPrimary(1),{depth:null});

console.log("\nSET BACK AS PRIMARY");
console.dir(repository.setPrimary(back.id),{depth:null});

console.log("\nUPDATED PRODUCT IMAGES");
console.dir(repository.getByProductId(1),{depth:null});

console.log("\nRECOGNITION IMAGES");
console.dir(
  repository.getByRecognitionId("recognition-1"),
  {depth:null},
);

console.log("\nDELETE BARCODE");
console.log(repository.delete(barcode.id));

console.log("\nFINAL");
console.dir(repository.getByProductId(1),{depth:null});