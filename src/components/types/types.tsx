export interface IUser {
    id: string;
    photo?: string;
    company: string;
    phone1: string;
    email: string;
}

export type FormsType = 'accaunt' | 'profile' | 'contacts' | 'capabilities'