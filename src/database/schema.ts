//shopper-assistant\src\database\schema.ts
import { database } from "./database";
import{createProductImagesTable}from "./createProductImagesTable";

export function createTables() {
  database.execSync(`
    PRAGMA foreign_keys = ON;

    ----------------------------------------------------
    -- STORES
    ----------------------------------------------------

    CREATE TABLE IF NOT EXISTS Stores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      shortName TEXT,
      category TEXT,
      logo TEXT
    );

    ----------------------------------------------------
    -- PRODUCTS
    ----------------------------------------------------

    CREATE TABLE IF NOT EXISTS Products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      barcode TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      brand TEXT,
      category TEXT,
      subcategory TEXT,
      packaging TEXT,
      measurement REAL,
      measurementUnit TEXT,
      quantity REAL DEFAULT 1,
      quantityUnit TEXT,
      srp REAL,
      keywords TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );

    ----------------------------------------------------
    -- STORE PRICES
    ----------------------------------------------------

    CREATE TABLE IF NOT EXISTS StorePrices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      storeId INTEGER NOT NULL,
      productId INTEGER NOT NULL,
      price REAL NOT NULL,
      lastUpdated TEXT DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY(storeId)
        REFERENCES Stores(id),

      FOREIGN KEY(productId)
        REFERENCES Products(id)
    );

    ----------------------------------------------------
    -- TRANSACTIONS
    ----------------------------------------------------

    CREATE TABLE IF NOT EXISTS Transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      storeId INTEGER NOT NULL,
      paymentMethod TEXT,
      total REAL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY(storeId)
        REFERENCES Stores(id)
    );

    ----------------------------------------------------
    -- PAYMENT METHODS
    ----------------------------------------------------

    CREATE TABLE IF NOT EXISTS PaymentMethods(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL,
      enabled INTEGER NOT NULL DEFAULT 1,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );

    ----------------------------------------------------
    -- TRANSACTION ITEMS
    ----------------------------------------------------

    CREATE TABLE IF NOT EXISTS TransactionItems (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      transactionId INTEGER NOT NULL,
      productId INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,

      FOREIGN KEY(transactionId)
        REFERENCES Transactions(id),

      FOREIGN KEY(productId)
        REFERENCES Products(id)
    );

    ----------------------------------------------------
    -- SHOPPING LISTS
    ----------------------------------------------------

    CREATE TABLE IF NOT EXISTS ShoppingLists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );

    ----------------------------------------------------
    -- SHOPPING LIST ITEMS
    ----------------------------------------------------

    CREATE TABLE IF NOT EXISTS ShoppingListItems (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      shoppingListId INTEGER NOT NULL,
      productId INTEGER,
      itemName TEXT,
      quantity INTEGER DEFAULT 1,
      fulfilledQuantity INTEGER DEFAULT 0,
      checked INTEGER DEFAULT 0,

      FOREIGN KEY(shoppingListId)
        REFERENCES ShoppingLists(id),

      FOREIGN KEY(productId)
        REFERENCES Products(id)
    );

    ----------------------------------------------------
    -- PRICE HISTORY
    ----------------------------------------------------

    CREATE TABLE IF NOT EXISTS PriceHistory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      storeId INTEGER NOT NULL,
      productId INTEGER NOT NULL,
      price REAL NOT NULL,
      recordedAt TEXT DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY(storeId)
        REFERENCES Stores(id),

      FOREIGN KEY(productId)
        REFERENCES Products(id)
    );

    ----------------------------------------------------
    -- INDEXES
    ----------------------------------------------------

    CREATE INDEX IF NOT EXISTS idx_products_barcode
    ON Products(barcode);

    CREATE INDEX IF NOT EXISTS idx_storeprices_store
    ON StorePrices(storeId);

    CREATE INDEX IF NOT EXISTS idx_storeprices_product
    ON StorePrices(productId);

    CREATE UNIQUE INDEX IF NOT EXISTS idx_storeprices_unique
    ON StorePrices(storeId, productId);

    CREATE INDEX IF NOT EXISTS idx_transactions_date
    ON Transactions(createdAt);

    CREATE INDEX IF NOT EXISTS idx_pricehistory_product
    ON PriceHistory(productId);
  `);

   createProductImagesTable();

  try {
    database.execSync(`
      ALTER TABLE Products
      ADD COLUMN keywords TEXT;
    `);
  } catch (error) {}

  try {
    database.execSync(`
      ALTER TABLE Products
      ADD COLUMN subcategory TEXT;
    `);
  } catch {
  }

const paymentMethodCount=
	database.getFirstSync<{
		count:number;
	}>(
		`
		SELECT COUNT(*)AS count
		FROM PaymentMethods;
		`
	)?.count??0;

  if(paymentMethodCount===0){
    database.withTransactionSync(()=>{
      const defaults=[
        ["Cash","cash"],
        ["Debit Card","card"],
        ["Credit Card","card"],
        ["GCash","e-wallet"],
        ["Maya","e-wallet"],
        ["Bank Transfer","bank"],
      ];

      for(const[name,type]of defaults){
        database.runSync(
          `
          INSERT INTO PaymentMethods
          (name,type,enabled)
          VALUES(?,?,1);
          `,
          [name,type]
        );
      }
    });
  }

  const productColumns =
    database.getAllSync<{ name: string }>(
      "PRAGMA table_info(Products);"
    );

  const ensureColumn=(
    name:string,
    definition:string
  )=>{
    if(
      !productColumns.some(
        column=>column.name===name
      )
    ){
      database.execSync(`
        ALTER TABLE Products
        ADD COLUMN ${definition};
      `);
    }
  };

  ensureColumn(
    "packaging",
    "packaging TEXT"
  );

  ensureColumn(
    "measurement",
    "measurement REAL"
  );

  ensureColumn(
    "measurementUnit",
    "measurementUnit TEXT"
  );

  ensureColumn(
    "quantity",
    "quantity REAL DEFAULT 1"
  );

  ensureColumn(
    "quantityUnit",
    "quantityUnit TEXT"
  );

  const hasSrpColumn =
    productColumns.some(
      column => column.name === "srp"
    );

  if (!hasSrpColumn) {
    database.execSync(`
      ALTER TABLE Products
      ADD COLUMN srp REAL;
    `);
  }

  const shoppingListItemColumns=
    database.getAllSync<{name:string}>(
      "PRAGMA table_info(ShoppingListItems);"
    );

  const hasFulfilledQuantity=
    shoppingListItemColumns.some(
      column=>column.name==="fulfilledQuantity"
    );

  if(!hasFulfilledQuantity){
    database.execSync(`
      ALTER TABLE ShoppingListItems
      ADD COLUMN fulfilledQuantity INTEGER DEFAULT 0;
    `);
  }
}