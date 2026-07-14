import { database } from "../database";

export class TransactionRepository {

  static getAll() {
    return database.getAllSync(`
      SELECT *
      FROM Transactions
      ORDER BY createdAt DESC;
    `);
  }

}