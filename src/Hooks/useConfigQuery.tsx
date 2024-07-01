// import { isUndefined, omitBy } from 'lodash'

// cú pháp để tree-tracking
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'

import UesQueryParams from './UesQueryParams'
import { productListConfig } from '~/types/products.type'

export type QueryConfig = {
  [key in keyof productListConfig]: string
}
export default function useConfigQuery() {
  const params: QueryConfig = UesQueryParams()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const queryConfig: QueryConfig = omitBy(
    {
      page: params.page || '1',
      limit: params.limit || '10',
      exclide: params.exclide,
      name: params.name,
      order: params.order,
      price_max: params.price_max,
      price_min: params.price_min,
      rating_filter: params.rating_filter,
      sort_by: params.sort_by,
      category: params.category
    },
    isUndefined
  )
  return queryConfig
}
