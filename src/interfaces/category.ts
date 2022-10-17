import { Product } from "./product";

export interface Category {
    id: number,
    title: string,
    imageUrl: string,
    items: Product[]
}

export interface CategoryMap {
    [key: string]: Product[]
}