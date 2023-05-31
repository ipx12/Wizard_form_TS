import { openDB, DBSchema } from "idb";
import { IUser } from "../components/types/types";

interface FormsDB extends DBSchema {
	forms: {
		key: string;
		value: IUser;
	};
}

const formPromise = openDB<FormsDB>("forms-store", 1, {
	upgrade(db) {
		db.createObjectStore("forms");
	},
});

export async function formsGet(key: any) {
	return (await formPromise).get("forms", key);
}
export async function formsSet(key: any, val: any) {
	return (await formPromise).put("forms", val, key);
}
export async function formsDel(key: any) {
	return (await formPromise).delete("forms", key);
}
export async function formsClear() {
	return (await formPromise).clear("forms");
}
export async function formsKeys() {
	return (await formPromise).getAllKeys("forms");
}
export async function formsValues() {
	return (await formPromise).getAll("forms");
}

//---------------- Users store

interface UsersDB extends DBSchema {
	users: {
		key: string;
		value: IUser;
	};
}

const userPromise = openDB<UsersDB>("users-store", 1, {
	upgrade(db) {
		db.createObjectStore("users");
	},
});

export async function usersGet(key: any) {
	return (await userPromise).get("users", key);
}
export async function usersSet(key: any, val: IUser) {
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
