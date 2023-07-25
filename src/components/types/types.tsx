export interface IAccauntFormValues {
	userName: string;
	password: string;
	repeatPassword: string;
	photo: string;
	id: string;
}

export interface IProfileFormValues {
	firstName: string;
	lastName: string;
	email: string;
	address: string;
	gander: string;
	birthDay: number;
}

export interface IContactsFormValue {
	company: string;
	github?: string;
	facebook?: string;
	fax?: string;
	phone1?: string;
	phone2?: string;
	phone3?: string;
	language: StandartObjectOptions | null;
}

export interface ICapabilitiesFromValue {
	skills: StandartObjectOptions[] | [];
	aditional?: string;
	hobbies: string[] | [];
}

export type StandartObjectOptions = {
	value: string;
	label: string;
};

export interface IUser
	extends IAccauntFormValues,
		IProfileFormValues,
		IContactsFormValue,
		ICapabilitiesFromValue {}

export type AllFormsType =
	| IAccauntFormValues
	| IProfileFormValues
	| IContactsFormValue
	| IAccauntFormValues;

export type FormsType = "accaunt" | "profile" | "contacts" | "capabilities";
