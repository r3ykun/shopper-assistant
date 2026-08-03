import{database}from"../database";
import{ShoppingList}from"../entities/ShoppingList";

export class ShoppingListRepository{

	static getAll(){
		return database.getAllSync<ShoppingList>(`
			SELECT*
			FROM ShoppingLists
			ORDER BY createdAt DESC;
		`);
	}

	static create(name:string){
		database.runSync(`
			INSERT INTO ShoppingLists(name)
			VALUES(?);
		`,[name]);
	}

	static delete(id:number){
		database.withTransactionSync(()=>{
			database.runSync(`
				DELETE FROM ShoppingListItems
				WHERE shoppingListId=?;
			`,[id]);

			database.runSync(`
				DELETE FROM ShoppingLists
				WHERE id=?;
			`,[id]);
		});
	}

	static rename(
		id:number,
		name:string
	){
		database.runSync(`
			UPDATE ShoppingLists
			SET name=?
			WHERE id=?;
		`,[
			name,
			id,
		]);
	}
}