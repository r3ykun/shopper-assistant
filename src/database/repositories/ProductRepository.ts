import { database } from "../database";
import { Product } from "../entities/Product";

export class ProductRepository {

    static getAll(): Product[] {

        return database.getAllSync<Product>(`
            SELECT *
            FROM Products
            ORDER BY name;
        `);

    }

    static findById(id: number): Product | null {
        return database.getFirstSync<Product>(
            `
            SELECT *
            FROM Products
            WHERE id = ?;
            `,
            [id]
        );
    }

    static update(product: Product) {
    database.runSync(
        `
        UPDATE Products
        SET
        barcode = ?,
        name = ?,
        brand = ?,
        category = ?,
        measurement = ?,
        unit = ?,
        srp = ?
        WHERE id = ?;
        `,
        [
        product.barcode,
        product.name,
        product.brand ?? null,
        product.category ?? null,
        product.measurement,
        product.unit ?? null,
        product.srp ?? null,
        product.id,
        ]
    );
    }

    static findByBarcode(
        barcode: string
    ): Product | null {

        return database.getFirstSync<Product>(

            `
            SELECT *
            FROM Products
            WHERE barcode = ?;
            `,

            [barcode]

        );

    }

    static create(product: Omit<Product, "id">) {

        database.runSync(

            `
            INSERT INTO Products
            (
                barcode,
                name,
                brand,
                category,
                measurement,
                unit,
                srp
            )

            VALUES
            (
                ?,?,?,?,?,?,?
            );
            `,

            [
                product.barcode,
                product.name,
                product.brand ?? null,
                product.category ?? null,
                product.measurement,
                product.unit ?? null,
                product.srp ?? null,
            ]

        );

    }

    static delete(id: number) {
    database.withTransactionSync(() => {
        database.runSync(
        `
        DELETE FROM StorePrices
        WHERE productId = ?;
        `,
        [id]
        );

        database.runSync(
        `
        DELETE FROM PriceHistory
        WHERE productId = ?;
        `,
        [id]
        );

        database.runSync(
        `
        DELETE FROM ShoppingListItems
        WHERE productId = ?;
        `,
        [id]
        );

        database.runSync(
        `
        DELETE FROM TransactionItems
        WHERE productId = ?;
        `,
        [id]
        );

        database.runSync(
        `
        DELETE FROM Products
        WHERE id = ?;
        `,
        [id]
        );
    });
    }
}