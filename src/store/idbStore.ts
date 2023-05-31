import { openDB, DBSchema } from "idb";

interface MyDB extends DBSchema {
	forms: {
		key: string;
		value: {
			activeFromName: string;
		};
	};
}

const dbPromise = openDB<MyDB>("forms-store", 1, {
	upgrade(db) {
		db.createObjectStore("forms");
	},
});

export async function formsGet(key: any) {
	return (await dbPromise).get("forms", key);
}
export async function formsSet(key: any, val: any) {
	return (await dbPromise).put("forms", val, key);
}
export async function formsDel(key: any) {
	return (await dbPromise).delete("forms", key);
}
export async function formsClear() {
	return (await dbPromise).clear("forms");
}
export async function formsKeys() {
	return (await dbPromise).getAllKeys("forms");
}
export async function formsValues() {
	return (await dbPromise).getAll("forms");
}

//---------------- Users store

const userPromise = openDB("users-store", 1, {
	upgrade(db) {
		db.createObjectStore("users");
	},
});

export async function usersGet(key: any) {
	return (await userPromise).get("users", key);
}
export async function usersSet(key: any, val: any) {
	return (await userPromise).put("users", val, key);
}
export async function usersDel(key: any) {
	return (await userPromise).delete("users", key);
}
export async function usersClear() {
	return (await userPromise).clear("users");
}
export async function usersKeys() {
	return (await userPromise).getAllKeys("users");
}
export async function usersValues() {
	return (await userPromise).getAll("users");
}
