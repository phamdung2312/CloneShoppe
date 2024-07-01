import { categoryType } from '~/types/category'
import { SuccessResponseAPI } from '~/types/utils.type'
import http from '~/utils/Http'

export const getCategory = () => http.get<SuccessResponseAPI<categoryType[]>>('/categories')
