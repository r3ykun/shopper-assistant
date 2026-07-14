import { database } from "../database";

export class StoreRepository {

  static getAll() {
    return database.getAllSync(`
      SELECT *
      FROM Stores
      ORDER BY name;
    `);
  }

}