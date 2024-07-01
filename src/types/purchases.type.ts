import { product } from './products.type'

export type purchasesStatus = -1 | 1 | 2 | 3 | 4 | 5
export type purchasesStatusList = purchasesStatus | 0

export interface purchases {
  buy_count: number
  price: number
  price_before_discount: number
  status: purchasesStatus
  _id: string
  user: string
  product: product
  createdAt: string
  updatedAt: string
}
