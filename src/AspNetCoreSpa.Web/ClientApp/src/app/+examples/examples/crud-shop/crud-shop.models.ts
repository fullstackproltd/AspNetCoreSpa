export enum Gender {
    None,
    Female,
    Male
}

export interface ICustomer {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    gender: Gender;
}
