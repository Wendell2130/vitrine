import { Iproduct } from "./product-interface"

export interface Icart {
  id: number
  userId: number
  products: Iproduct[]
}


