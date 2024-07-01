import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import ProductItem from './ProductItem'
import SortFilter from './SortFilter'
import productAPI from '~/Apis/product.api'
import Panigation from '~/componet/Panigation/Panigation'
import { productListConfig } from '~/types/products.type'
import { getCategory } from '~/Apis/category'
import useConfigQuery from '~/Hooks/useConfigQuery'
import { Helmet } from 'react-helmet-async'

export type QueryConfig = {
  [key in keyof productListConfig]: string
}

export default function ProductList() {
  // const params: QueryConfig = UesQueryParams()
  // const queryConfig: QueryConfig = omitBy(
  //   {
  //     page: params.page || '1',
  //     limit: params.limit || '10',
  //     exclide: params.exclide,
  //     name: params.name,
  //     order: params.order,
  //     price_max: params.price_max,
  //     price_min: params.price_min,
  //     rating_filter: params.rating_filter,
  //     sort_by: params.sort_by,
  //     category: params.category
  //   },
  //   isUndefined
  // )
  const queryConfig = useConfigQuery()
  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productAPI.getProductList(queryConfig as productListConfig),
    placeholderData: keepPreviousData,

    staleTime: Infinity
  })
  const { data: categoryData } = useQuery({
    queryKey: ['category'],
    queryFn: () => getCategory()
  })

  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>Trang chủ | Shoppe clone</title>
        <meta name='description' content='một số mặt hàng được bán với chất lượng sản phẩm cao, uy tín và chất lượng' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-2'>
            <AsideFilter category={categoryData?.data.data} queryConfig={queryConfig}></AsideFilter>
          </div>
          {productData && (
            <div className='col-span-10'>
              <SortFilter queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size}></SortFilter>
              <div className=' grid grid-cols-2 mt-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {productData.data.data.products.map((product, index) => (
                  <div className='col-span-1' key={index}>
                    <ProductItem productData={product}></ProductItem>
                  </div>
                ))}
              </div>
              <Panigation queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size}></Panigation>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
