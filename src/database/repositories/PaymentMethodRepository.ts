//shopper-assistant/src/database/repositories/PaymentMethodRepository.ts
import{database}from"../database";
import{PaymentMethod}from"../entities/PaymentMethod";

export class PaymentMethodRepository{
	static getAll():PaymentMethod[]{
		return database.getAllSync<PaymentMethod>(`
			SELECT*
			FROM PaymentMethods
			ORDER BY
				enabled DESC,
				name COLLATE NOCASE ASC;
		`);
	}

	static getEnabled():PaymentMethod[]{
		return database.getAllSync<PaymentMethod>(`
			SELECT*
			FROM PaymentMethods
			WHERE enabled=1
			ORDER BY name COLLATE NOCASE ASC;
		`);
	}

	static create(
		name:string,
		type:string
	):number{
		const result=database.runSync(
			`
			INSERT INTO PaymentMethods
			(name,type,enabled)
			VALUES(?,?,1);
			`,
			[
				name.trim(),
				type.trim(),
			]
		);

		return Number(
			result.lastInsertRowId
		);
	}

	static update(
		id:number,
		name:string,
		type:string
	){
		database.runSync(
			`
			UPDATE PaymentMethods
			SET
				name=?,
				type=?
			WHERE id=?;
			`,
			[
				name.trim(),
				type.trim(),
				id,
			]
		);
	}

	static setEnabled(
		id:number,
		enabled:boolean
	){
		database.runSync(
			`
			UPDATE PaymentMethods
			SET enabled=?
			WHERE id=?;
			`,
			[
				enabled?1:0,
				id,
			]
		);
	}

	static delete(id:number){
		database.runSync(
			`
			DELETE FROM PaymentMethods
			WHERE id=?;
			`,
			[id]
		);
	}
}