//shopper-assistant\src\services\TransactionService.ts
import{CartItem}from"../types/CartItem";
import{
	TransactionFilter,
	TransactionRepository,
}from"../database/repositories/TransactionRepository";

export interface CheckoutInput{
	storeId:number;
	paymentMethod?:string;
	items:CartItem[];
}

export class TransactionService{
	static checkout({
		storeId,
		paymentMethod,
		items,
	}:CheckoutInput):number{
		if(items.length===0){
			throw new Error(
				"Cart cannot be empty."
			);
		}

		const total=items.reduce(
			(sum,item)=>
				sum+item.subtotal,
			0
		);

		return TransactionRepository.create({
			storeId,
			paymentMethod,
			total,
      createdAt:new Date().toISOString(),
			items:items.map(item=>({
				productId:item.productId,
				quantity:item.quantity,
				price:item.price,
			})),
		});
	}

  static getAll(
    filter?:TransactionFilter
  ){
    return TransactionRepository.getAll(
      filter
    );
  }

  static getPurchaseStatistics(){
    return TransactionRepository
      .getPurchaseStatistics();
  }

	static getById(id:number){
		return TransactionRepository.findById(id);
	}

	static getItems(transactionId:number){
		return TransactionRepository.getItems(
			transactionId
		);
	}
}