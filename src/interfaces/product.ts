export interface Product {
    id: number,
    name: string,
    imageUrl: string,
    price: number
}

export interface CheckoutProduct extends Product {
    quantity: number
}