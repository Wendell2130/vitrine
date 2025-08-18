
export interface Icart {
  id: number
  userId: number
  date: string
  products: ProductCart[]
  __v: number
}

export interface ProductCart {
  productId: number
  quantity: number
}
