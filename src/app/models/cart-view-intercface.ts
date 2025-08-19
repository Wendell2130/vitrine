export interface CartView {
    id: number
    userId: number
    date: string
    products: ProductView[]
    totalBuy: number
}
export interface ProductView {
    productId: number
    image: string
    title: string
    quantity: number
    price: number
}
