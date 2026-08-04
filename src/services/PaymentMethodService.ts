import{
	PaymentMethodRepository,
}from"../database/repositories/PaymentMethodRepository";

export class PaymentMethodService{
	static getAll(){
		return PaymentMethodRepository.getAll();
	}

	static getEnabled(){
		return PaymentMethodRepository.getEnabled();
	}

	static create(
		name:string,
		type:string
	){
		const cleanedName=name.trim();
		const cleanedType=type.trim();

		if(!cleanedName){
			throw new Error(
				"Payment method name is required."
			);
		}

		if(!cleanedType){
			throw new Error(
				"Payment method type is required."
			);
		}

		return PaymentMethodRepository.create(
			cleanedName,
			cleanedType
		);
	}

	static update(
		id:number,
		name:string,
		type:string
	){
		if(!name.trim()){
			throw new Error(
				"Payment method name is required."
			);
		}

		PaymentMethodRepository.update(
			id,
			name,
			type
		);
	}

	static setEnabled(
		id:number,
		enabled:boolean
	){
		PaymentMethodRepository.setEnabled(
			id,
			enabled
		);
	}

	static delete(id:number){
		PaymentMethodRepository.delete(id);
	}
}