//shopper-assistant\src\services\ShoppingListService.ts
import { database } from "../database/database";
import {
  getShoppingTerms,
} from "../constants/subcategoryMetadata";

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
  fulfilledQuantity:number;
  checked: number;

  productName?: string | null;
  brand?: string | null;
  barcode?: string | null;
};

export type ShoppingListMatchResult={
	count:number;
	consumedQuantity:number;
	fulfilledQuantity:number;
	requiredQuantity:number;
	remainingQuantity:number;
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
        sli.fulfilledQuantity,
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
        fulfilledQuantity,
        checked
      )
      VALUES (?, ?, ?, ?, 0, 0);
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
        fulfilledQuantity,
        checked
      )
      VALUES (?, NULL, ?, ?, 0, 0);
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
    itemId:number,
    checked:boolean
  ){
    if(checked){
      database.runSync(
        `
        UPDATE ShoppingListItems
        SET
          fulfilledQuantity=quantity,
          checked=1
        WHERE id=?;
        `,
        [itemId]
      );
      return;
    }

    database.runSync(
      `
      UPDATE ShoppingListItems
      SET
        fulfilledQuantity=0,
        checked=0
      WHERE id=?;
      `,
      [itemId]
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

  deleteItems(itemIds:number[]){
    if(itemIds.length===0)return;

    database.withTransactionSync(()=>{
      for(const itemId of itemIds){
        database.runSync(
          `
          DELETE FROM ShoppingListItems
          WHERE id=?;
          `,
          [itemId]
        );
      }
    });
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

  checkMatchingItemsWithQuantity(
    product:{
      id:number;
      name:string;
      brand?:string|null;
      category?:string|null;
      subcategory?:string|null;
    },
    purchasedQuantity:number
  ):ShoppingListMatchResult{
    const selectedQuantity=Math.max(
      1,
      Math.floor(purchasedQuantity)
    );

    const uncheckedItems=
      database.getAllSync<{
        id:number;
        productId:number|null;
        itemName:string|null;
        quantity:number;
        fulfilledQuantity:number;
      }>(
        `
        SELECT
          id,
          productId,
          itemName,
          quantity,
          fulfilledQuantity
        FROM ShoppingListItems
        WHERE checked=0
        ORDER BY id ASC;
        `
      );

    const subcategory=product.subcategory??"";
    const shoppingTerms=getShoppingTerms(subcategory);

    const productWords=[
      product.brand??"",
      product.name,
      product.category??"",
      subcategory,
      ...shoppingTerms,
    ]
      .join(" ")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g," ")
      .split(/\s+/)
      .filter(Boolean);

    const matchingItems=uncheckedItems.filter(item=>{
      if(item.productId!==null){
        return item.productId===product.id;
      }

      const itemWords=(item.itemName??"")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g," ")
        .trim()
        .split(/\s+/)
        .filter(word=>word.length>=3);

      if(itemWords.length===0)return false;

      return itemWords.every(
        word=>productWords.includes(word)
      );
    });

    let quantityToApply=selectedQuantity;
    let consumedQuantity=0;
    let completedCount=0;

    database.withTransactionSync(()=>{
      for(const item of matchingItems){
        if(quantityToApply<=0)break;

        const originalQuantity=Math.max(
          1,
          item.quantity
        );

        const currentFulfilled=Math.max(
          0,
          item.fulfilledQuantity??0
        );

        const remaining=Math.max(
          0,
          originalQuantity-currentFulfilled
        );

        if(remaining===0)continue;

        const consumed=Math.min(
          remaining,
          quantityToApply
        );

        const nextFulfilled=
          currentFulfilled+consumed;

        const completed=
          nextFulfilled>=originalQuantity;

        database.runSync(
          `
          UPDATE ShoppingListItems
          SET
            fulfilledQuantity=?,
            checked=?
          WHERE id=?;
          `,
          [
            nextFulfilled,
            completed?1:0,
            item.id,
          ]
        );

        consumedQuantity+=consumed;
        quantityToApply-=consumed;

        if(completed){
          completedCount++;
        }
      }
    });

    const requiredQuantity=matchingItems.reduce(
      (total,item)=>
        total+Math.max(1,item.quantity),
      0
    );

    const fulfilledQuantity=Math.min(
      requiredQuantity,
      matchingItems.reduce(
        (total,item)=>
          total+
          Math.max(
            0,
            item.fulfilledQuantity??0
          ),
        0
      )+consumedQuantity
    );

    return{
      count:completedCount,
      consumedQuantity,
      fulfilledQuantity,
      requiredQuantity,
      remainingQuantity:Math.max(
        0,
        requiredQuantity-fulfilledQuantity
      ),
    };
  },

checkMatchingItems(product:{
	id:number;
	name:string;
	brand?:string|null;
	category?:string|null;
	subcategory?:string|null;
}):number{
	return ShoppingListService
		.checkMatchingItemsWithQuantity(
			product,
			1
		).count;
},

};