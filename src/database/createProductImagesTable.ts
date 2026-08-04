import{database}from "./database";

export function createProductImagesTable():void{
  database.runSync(`
    CREATE TABLE IF NOT EXISTS ProductImages(
      id TEXT PRIMARY KEY NOT NULL,
      productId INTEGER,
      recognitionId TEXT,
      uri TEXT NOT NULL,
      type TEXT NOT NULL,
      source TEXT NOT NULL,
      isPrimary INTEGER NOT NULL DEFAULT 0,
      width INTEGER,
      height INTEGER,
      mimeType TEXT,
      fileName TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY(productId)REFERENCES Products(id)ON DELETE CASCADE
    );
  `);
  database.runSync(`
    CREATE INDEX IF NOT EXISTS idx_ProductImages_productId
    ON ProductImages(productId);
  `);
  database.runSync(`
    CREATE INDEX IF NOT EXISTS idx_ProductImages_recognitionId
    ON ProductImages(recognitionId);
  `);
}