import { database } from "../database";
import { StorePrice } from "../entities/StorePrice";

export class StorePriceRepository {
  static findByStoreAndProduct(
    storeId: number,
    productId: number
  ): StorePrice | null {
    return database.getFirstSync<StorePrice>(
      `
      SELECT *
      FROM StorePrices
      WHERE storeId = ?
      AND productId = ?;
      `,
      [storeId, productId]
    );
  }

  static getPrice(
    storeId: number,
    productId: number
  ): number | null {
    const result =
      database.getFirstSync<{ price: number }>(
        `
        SELECT price
        FROM StorePrices
        WHERE storeId = ?
        AND productId = ?;
        `,
        [storeId, productId]
      );

    return result?.price ?? null;
  }

  static getAllForStore(
    storeId: number
  ): StorePrice[] {
    return database.getAllSync<StorePrice>(
      `
      SELECT *
      FROM StorePrices
      WHERE storeId = ?
      ORDER BY productId;
      `,
      [storeId]
    );
  }

  static setPrice(
    storeId: number,
    productId: number,
    price: number
  ) {
    database.runSync(
      `
      INSERT INTO StorePrices (
        storeId,
        productId,
        price,
        lastUpdated
      )
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(storeId, productId)
      DO UPDATE SET
        price = excluded.price,
        lastUpdated = CURRENT_TIMESTAMP;
      `,
      [storeId, productId, price]
    );
  }

  static deletePrice(
    storeId: number,
    productId: number
  ) {
    database.runSync(
      `
      DELETE FROM StorePrices
      WHERE storeId = ?
      AND productId = ?;
      `,
      [storeId, productId]
    );
  }
}