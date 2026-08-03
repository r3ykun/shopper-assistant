//shopper-assistant/src/services/StorePriceService.ts
import { StorePriceRepository } from "../database/repositories/StorePriceRepository";

export class StorePriceService {
  static getPrice(
    storeId: number,
    productId: number
  ) {
    return StorePriceRepository.getPrice(
      storeId,
      productId
    );
  }

  static getPricesForStore(
    storeId: number
  ) {
    return StorePriceRepository.getAllForStore(
      storeId
    );
  }

  static savePrice(
    storeId: number,
    productId: number,
    price: number
  ) {
    if (!Number.isFinite(price) || price < 0) {
      throw new Error(
        "Price must be a valid non-negative number."
      );
    }

    StorePriceRepository.setPrice(
      storeId,
      productId,
      price
    );
  }

  static removePrice(
    storeId: number,
    productId: number
  ) {
    StorePriceRepository.deletePrice(
      storeId,
      productId
    );
  }
}