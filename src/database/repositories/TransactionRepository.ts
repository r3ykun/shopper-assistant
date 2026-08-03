//shopper-assistant\src\database\repositories\TransactionRepository.ts
import{database}from"../database";
import{Transaction}from"../entities/Transaction";
import{TransactionItem}from"../entities/TransactionItem";

export interface CheckoutTransactionItem{
	productId:number;
	quantity:number;
	price:number;
}

export interface CreateTransactionInput{
	storeId:number;
	paymentMethod?:string;
	total:number;
	createdAt:string;
	items:CheckoutTransactionItem[];
}

export interface TransactionSummary{
	id:number;
	storeId:number;
	storeName:string;
	paymentMethod:string|null;
	total:number;
	totalItems:number;
	uniqueProducts:number;
	createdAt:string;
}

export type TransactionSort=
	|"date-desc"
	|"date-asc"
	|"total-desc"
	|"total-asc";

export interface TransactionFilter{
	storeId?:number;
	startDate?:string;
	endDate?:string;
	minTotal?:number;
	maxTotal?:number;
	sort?:TransactionSort;
}

export interface PurchaseStatistics{
	totalTransactions:number;
	totalSpent:number;
	averageTransaction:number;
	totalItemsPurchased:number;
	uniqueProductsPurchased:number;
	firstPurchaseAt:string|null;
	lastPurchaseAt:string|null;
}

export class TransactionRepository{
  static getAll(
    filter?:TransactionFilter
  ):TransactionSummary[]{
    const conditions:string[]=[];
    const args:Array<
      string|number|null
    >=[];

    if(filter?.storeId){
      conditions.push(
        "t.storeId=?"
      );
      args.push(filter.storeId);
    }

    if(filter?.startDate){
      conditions.push(
        "date(t.createdAt)>=date(?)"
      );
      args.push(filter.startDate);
    }

    if(filter?.endDate){
      conditions.push(
        "date(t.createdAt)<=date(?)"
      );
      args.push(filter.endDate);
    }

    if(
      filter?.minTotal!==undefined&&
      Number.isFinite(filter.minTotal)
    ){
      conditions.push("t.total>=?");
      args.push(filter.minTotal);
    }

    if(
      filter?.maxTotal!==undefined&&
      Number.isFinite(filter.maxTotal)
    ){
      conditions.push("t.total<=?");
      args.push(filter.maxTotal);
    }

    const orderBy={
      "date-desc":"t.createdAt DESC",
      "date-asc":"t.createdAt ASC",
      "total-desc":"t.total DESC,t.createdAt DESC",
      "total-asc":"t.total ASC,t.createdAt DESC",
    }[filter?.sort??"date-desc"];

    const whereClause=
      conditions.length>0
        ?`WHERE ${conditions.join(" AND ")}`
        :"";

    return database.getAllSync<TransactionSummary>(
      `
      SELECT
        t.id,
        t.storeId,
        COALESCE(
          s.shortName,
          s.name,
          'Unknown Store'
        )AS storeName,
        t.paymentMethod,
        t.total,
        COALESCE(
          SUM(ti.quantity),
          0
        )AS totalItems,
        COUNT(
          DISTINCT ti.productId
        )AS uniqueProducts,
        t.createdAt
      FROM Transactions t
      LEFT JOIN Stores s
        ON s.id=t.storeId
      LEFT JOIN TransactionItems ti
        ON ti.transactionId=t.id
      ${whereClause}
      GROUP BY
        t.id,
        t.storeId,
        s.shortName,
        s.name,
        t.paymentMethod,
        t.total,
        t.createdAt
      ORDER BY
        ${orderBy}
      `,
      args
    );
  }

  static getPurchaseStatistics():PurchaseStatistics{
    return database.getFirstSync<PurchaseStatistics>(`
      SELECT
        COUNT(DISTINCT t.id)AS totalTransactions,
        COALESCE(SUM(t.total),0)AS totalSpent,
        COALESCE(AVG(t.total),0)AS averageTransaction,
        COALESCE(SUM(ti.quantity),0)AS totalItemsPurchased,
        COUNT(DISTINCT ti.productId)AS uniqueProductsPurchased,
        MIN(t.createdAt)AS firstPurchaseAt,
        MAX(t.createdAt)AS lastPurchaseAt
      FROM Transactions t
      LEFT JOIN TransactionItems ti
        ON ti.transactionId=t.id;
    `)??{
      totalTransactions:0,
      totalSpent:0,
      averageTransaction:0,
      totalItemsPurchased:0,
      uniqueProductsPurchased:0,
      firstPurchaseAt:null,
      lastPurchaseAt:null,
    };
  }

	static findById(
		id:number
	):Transaction|null{
		return database.getFirstSync<Transaction>(
			`
			SELECT*
			FROM Transactions
			WHERE id=?;
			`,
			[id]
		)??null;
	}

  static getItems(
    transactionId:number
  ){
    return database.getAllSync<{
      id:number;
      productId:number;
      productName:string;
      brand:string|null;
      barcode:string|null;
      quantity:number;
      price:number;
      subtotal:number;
    }>(`
      SELECT
        ti.id,
        ti.productId,
        p.name AS productName,
        p.brand,
        p.barcode,
        ti.quantity,
        ti.price,
        ti.quantity*ti.price AS subtotal
      FROM TransactionItems ti
      LEFT JOIN Products p
        ON p.id=ti.productId
      WHERE ti.transactionId=?
      ORDER BY p.name COLLATE NOCASE;
    `,[
      transactionId,
    ]);
  }

	static create(
		input:CreateTransactionInput
	):number{
		let transactionId=0;

		database.withTransactionSync(()=>{
			const result=database.runSync(
				`
        INSERT INTO Transactions
        (
          storeId,
          paymentMethod,
          total,
          createdAt
        )
        VALUES(?,?,?,?);
				`,
				[
					input.storeId,
					input.paymentMethod??null,
					input.total,
					input.createdAt,
				]
			);

			transactionId=Number(
				result.lastInsertRowId
			);

			for(const item of input.items){
				database.runSync(
					`
					INSERT INTO TransactionItems
					(
						transactionId,
						productId,
						quantity,
						price
					)
					VALUES(?,?,?,?);
					`,
					[
						transactionId,
						item.productId,
						item.quantity,
						item.price,
					]
				);
			}
		});

		return transactionId;
	}
}