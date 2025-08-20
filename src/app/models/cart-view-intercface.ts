export interface CartView {
    id: number
    userId: number
    date: string
    products: ProductView[]
    
}
export interface ProductView {
    productId: number
    image: string
    title: string
    quantity: number
    price: number
}
