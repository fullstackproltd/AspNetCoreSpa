/* Defines the product entity */
export interface IProduct {
    id: number;
    productName: string;
    productCode: string;
    tags?: string[];
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
}
