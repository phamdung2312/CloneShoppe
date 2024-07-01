import { purchases, purchasesStatusList } from '~/types/purchases.type'
import { SuccessResponseAPI } from '~/types/utils.type'
import http from '~/utils/Http'

const URL = 'purchases'

const purchasesAPI = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponseAPI<purchases>>(`${URL}/add-to-cart`, body)
  },
  getPurchase(params: { status: purchasesStatusList }) {
    return http.get<SuccessResponseAPI<purchases[]>>(URL, { params })
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponseAPI<purchases>>(`${URL}/update-purchase`, body)
  },
  deletePurchases(purchase_id: string[]) {
    return http.delete<
      SuccessResponseAPI<{
        deleted_count: number
      }>
    >(`${URL}`, { data: purchase_id })
  },
  buyPurchases(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessResponseAPI<purchases>>(`${URL}/buy-products`, body)
  }
}
export default purchasesAPI
