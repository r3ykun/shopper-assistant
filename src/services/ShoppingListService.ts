import { database } from "../database/database";

export type ShoppingListRecord = {
  id: number;
  name: string;
  createdAt: string;
};

export type ShoppingListItemRecord = {
  id: number;
  shoppingListId: number;
  productId: number | null;
  itemName: string;
  quantity: number;
  checked: number;

  productName?: string | null;
  brand?: string | null;
  barcode?: string | null;
};

export const ShoppingListService = {
  getAllLists(): ShoppingListRecord[] {
    return database.getAllSync<ShoppingListRecord>(`
      SELECT
        id,
        name,
        createdAt
      FROM ShoppingLists
      ORDER BY createdAt DESC;
    `);
  },

  getList(
    id: number
  ): ShoppingListRecord | null {
    return (
      database.getFirstSync<ShoppingListRecord>(
        `
        SELECT
          id,
          name,
          createdAt
        FROM ShoppingLists
        WHERE id = ?;
        `,
        [id]
      ) ?? null
    );
  },

  createList(name: string) {
    const cleanedName = name.trim();

    if (!cleanedName) {
      throw new Error(
        "Shopping list name is required."
      );
    }

    database.runSync(
      `
      INSERT INTO ShoppingLists
      (
        name
      )
      VALUES (?);
      `,
      [cleanedName]
    );
  },

  renameList(
    id: number,
    name: string
  ) {
    const cleanedName = name.trim();

    if (!cleanedName) {
      throw new Error(
        "Shopping list name is required."
      );
    }

    database.runSync(
      `
      UPDATE ShoppingLists
      SET name = ?
      WHERE id = ?;
      `,
      [
        cleanedName,
        id,
      ]
    );
  },

  deleteList(id: number) {
    database.withTransactionSync(() => {
      database.runSync(
        `
        DELETE FROM ShoppingListItems
        WHERE shoppingListId = ?;
        `,
        [id]
      );

      database.runSync(
        `
        DELETE FROM ShoppingLists
        WHERE id = ?;
        `,
        [id]
      );
    });
  },

  countItems(
    shoppingListId: number
  ): number {
    const result =
      database.getFirstSync<{
        count: number;
      }>(
        `
        SELECT COUNT(*) AS count
        FROM ShoppingListItems
        WHERE shoppingListId = ?;
        `,
        [shoppingListId]
      );

    return result?.count ?? 0;
  },

  getItems(
    shoppingListId: number
  ): ShoppingListItemRecord[] {
    return database.getAllSync<
      ShoppingListItemRecord
    >(
      `
      SELECT
        sli.id,
        sli.shoppingListId,
        sli.productId,
        sli.itemName,
        sli.quantity,
        sli.checked,

        p.name AS productName,
        p.brand AS brand,
        p.barcode AS barcode

      FROM ShoppingListItems sli

      LEFT JOIN Products p
        ON p.id = sli.productId

      WHERE sli.shoppingListId = ?

      ORDER BY
        sli.checked ASC,
        COALESCE(
          p.name,
          sli.itemName
        ) COLLATE NOCASE ASC;
      `,
      [shoppingListId]
    );
  },

  addProductItem(
    shoppingListId: number,
    productId: number,
    quantity: number
  ) {
    if (
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      throw new Error(
        "Quantity must be at least 1."
      );
    }

    const product =
      database.getFirstSync<{
        name: string;
      }>(
        `
        SELECT name
        FROM Products
        WHERE id = ?;
        `,
        [productId]
      );

    if (!product) {
      throw new Error(
        "Product not found."
      );
    }

    const existing =
      database.getFirstSync<{
        id: number;
        quantity: number;
      }>(
        `
        SELECT
          id,
          quantity
        FROM ShoppingListItems
        WHERE shoppingListId = ?
        AND productId = ?;
        `,
        [
          shoppingListId,
          productId,
        ]
      );

    if (existing) {
      database.runSync(
        `
        UPDATE ShoppingListItems
        SET quantity = ?
        WHERE id = ?;
        `,
        [
          existing.quantity +
            quantity,
          existing.id,
        ]
      );

      return;
    }

    database.runSync(
      `
      INSERT INTO ShoppingListItems
      (
        shoppingListId,
        productId,
        itemName,
        quantity,
        checked
      )
      VALUES (?, ?, ?, ?, 0);
      `,
      [
        shoppingListId,
        productId,
        product.name,
        quantity,
      ]
    );
  },

  addManualItem(
    shoppingListId: number,
    itemName: string,
    quantity: number
  ) {
    const cleanedName =
      itemName.trim();

    if (!cleanedName) {
      throw new Error(
        "Item name is required."
      );
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      throw new Error(
        "Quantity must be at least 1."
      );
    }

    database.runSync(
      `
      INSERT INTO ShoppingListItems
      (
        shoppingListId,
        productId,
        itemName,
        quantity,
        checked
      )
      VALUES (?, NULL, ?, ?, 0);
      `,
      [
        shoppingListId,
        cleanedName,
        quantity,
      ]
    );
  },

  updateItemQuantity(
    itemId: number,
    quantity: number
  ) {
    if (
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      throw new Error(
        "Quantity must be at least 1."
      );
    }

    database.runSync(
      `
      UPDATE ShoppingListItems
      SET quantity = ?
      WHERE id = ?;
      `,
      [
        quantity,
        itemId,
      ]
    );
  },

  toggleItemChecked(
    itemId: number,
    checked: boolean
  ) {
    database.runSync(
      `
      UPDATE ShoppingListItems
      SET checked = ?
      WHERE id = ?;
      `,
      [
        checked ? 1 : 0,
        itemId,
      ]
    );
  },

  deleteItem(itemId: number) {
    database.runSync(
      `
      DELETE FROM ShoppingListItems
      WHERE id = ?;
      `,
      [itemId]
    );
  },

  checkProduct(
    shoppingListId: number,
    productId: number
  ): boolean {
    const matchingItem =
      database.getFirstSync<{
        id: number;
      }>(
        `
        SELECT id
        FROM ShoppingListItems
        WHERE shoppingListId = ?
        AND productId = ?
        AND checked = 0
        LIMIT 1;
        `,
        [
          shoppingListId,
          productId,
        ]
      );

    if (!matchingItem) {
      return false;
    }

    database.runSync(
      `
      UPDATE ShoppingListItems
      SET checked = 1
      WHERE id = ?;
      `,
      [matchingItem.id]
    );

    return true;
  },
};