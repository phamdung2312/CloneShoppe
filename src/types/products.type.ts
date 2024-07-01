export interface product {
  _id: string
  images: string[]
  price: number
  rating: number
  description: string
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  category: {
    _id: string
    name: string
  }
  image: string
  createdAt: string
  updatedAt: string
}
export interface productList {
  products: product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}
export interface productListConfig {
  page?: number | string
  limit?: number | string
  order?: 'desc' | 'asc'
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  category?: string
  exclide?: string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
}
