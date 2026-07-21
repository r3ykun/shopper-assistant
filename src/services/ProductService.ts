//shopper-assistant\src\services\ProductService.ts
import { Product } from "../database/entities/Product";
import { ProductRepository } from "../database/repositories/ProductRepository";

export class ProductService {

    static getAllProducts() {

        return ProductRepository.getAll();

    }

    static findByBarcode(barcode: string) {

        return ProductRepository.findByBarcode(barcode);

    }

    static createProduct(
        product: Omit<Product, "id">
    ) {
        ProductRepository.create(product);
    }

    static deleteProduct(id: number) {
        ProductRepository.delete(id);
    }

    static getProduct(id: number) {
        return ProductRepository.findById(id);
    }

    static updateProduct(product: Product) {
        ProductRepository.update(product);
    }

}