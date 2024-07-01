import { product, productList, productListConfig } from '~/types/products.type'
import { SuccessResponseAPI } from '~/types/utils.type'
import http from '~/utils/Http'

const URL = '/products'

const productAPI = {
  getProductList(params: productListConfig) {
    return http.get<SuccessResponseAPI<productList>>(URL, { params })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponseAPI<product>>(`${URL}/${id}`)
  }
}

export default productAPI
