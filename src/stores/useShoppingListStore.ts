//shopper-assistant/src/stores/useShoppingListStore.ts
import{create}from"zustand";
import{
	ShoppingListRecord,
	ShoppingListService,
}from"../services/ShoppingListService";

type ShoppingListStore={
	lists:ShoppingListRecord[];
	activeListId:number|null;
	loading:boolean;
	error?:string;
	loadLists:()=>void;
	createList:(name:string)=>void;
	renameList:(id:number,name:string)=>void;
	deleteList:(id:number)=>void;
	setActiveList:(id:number|null)=>void;
	clearActiveList:()=>void;
};

export const useShoppingListStore=
create<ShoppingListStore>((set,get)=>({
	lists:[],
	activeListId:null,
	loading:false,
	error:undefined,

	loadLists(){
		set({
			loading:true,
			error:undefined,
		});

		try{
			const lists=
				ShoppingListService.getAllLists();

			const activeListId=
				get().activeListId;

			set({
				lists,
				activeListId:
					activeListId!==null&&
					lists.some(
						list=>list.id===activeListId
					)
						?activeListId
						:lists[0]?.id??null,
				loading:false,
			});
		}catch(error){
			set({
				loading:false,
				error:
					error instanceof Error
						?error.message
						:"Unable to load shopping lists.",
			});
		}
	},

	createList(name){
		try{
			ShoppingListService.createList(name);

			const lists=
				ShoppingListService.getAllLists();

			set({
				lists,
				activeListId:
					lists[0]?.id??
					get().activeListId,
				error:undefined,
			});
		}catch(error){
			set({
				error:
					error instanceof Error
						?error.message
						:"Unable to create shopping list.",
			});
		}
	},

	renameList(id,name){
		try{
			ShoppingListService.renameList(
				id,
				name
			);

			set({
				lists:
					ShoppingListService.getAllLists(),
				error:undefined,
			});
		}catch(error){
			set({
				error:
					error instanceof Error
						?error.message
						:"Unable to rename shopping list.",
			});
		}
	},

	deleteList(id){
		try{
			ShoppingListService.deleteList(id);

			const lists=
				ShoppingListService.getAllLists();

			set({
				lists,
				activeListId:
					get().activeListId===id
						?lists[0]?.id??null
						:get().activeListId,
				error:undefined,
			});
		}catch(error){
			set({
				error:
					error instanceof Error
						?error.message
						:"Unable to delete shopping list.",
			});
		}
	},

	setActiveList(id){
		set({
			activeListId:id,
		});
	},

	clearActiveList(){
		set({
			activeListId:null,
		});
	},
}));