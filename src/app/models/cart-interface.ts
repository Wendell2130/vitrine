
export interface Icart {
  id: number
  userId: number
  products: Iproduct[]
}

export interface Iproduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  quantity?: number
}
