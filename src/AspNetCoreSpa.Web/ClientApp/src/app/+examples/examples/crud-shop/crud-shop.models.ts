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
export interface IProduct {
    id: string;
    name: string;
    description: string;
    icon: string;
    buyingPrice: number;
    sellingPrice: number;
    unitsInStock: number;
    isActive: boolean;
    isDiscontinued: boolean;
}
export interface IProductCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
}
export interface IOrder {
    id: string;
    discount: string;
    comments: string;
}
