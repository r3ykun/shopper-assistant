import{database}from"../database";
import{Store}from"../entities/Store";

export class StoreRepository{
	static getAll():Store[]{
		return database.getAllSync<Store>(`
			SELECT*
			FROM Stores
			ORDER BY name;
		`);
	}
}