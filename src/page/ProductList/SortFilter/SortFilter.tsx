import { productListConfig } from '~/types/products.type'
import { QueryConfig } from '../ProductList'
import { order as orderPrice, sortBy } from '~/constant/product'
import classNames from 'classnames'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { path } from '~/constant/app.path'
// import { omit } from 'lodash'
// cú pháp để tree-tracking
import omit from 'lodash/omit'

interface sortFilterProps {
  queryConfig: QueryConfig
  pageSize: number
}
export default function SortFilter({ queryConfig, pageSize }: sortFilterProps) {
  const { sort_by = sortBy.createdAt, order, page } = queryConfig

  const navigation = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<productListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const handeleSortBy = (sortByValue: Exclude<productListConfig['sort_by'], undefined>) => {
    navigation({
      pathname: path.home,
      search: createSearchParams(omit({ ...queryConfig, sort_by: sortByValue }, ['order'])).toString()
    })
  }
  const handeleOderPrice = (orderPrice: Exclude<productListConfig['order'], undefined>) => {
    navigation({
      pathname: path.home,
      search: createSearchParams({ ...queryConfig, sort_by: sortBy.price, order: orderPrice }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3 rounded-sm mt-[60px] overflow-hidden'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3 sm:w-full flex-wrap'>
          <span className='sm:flex  inline-block'>Sắp xếp</span>
          <button
            className={classNames('h-[34px] cursor-pointer w-[90px] rounded-sm capitalize text-sm inline-block ', {
              'bg-[#f6432e] text-white hover:bg-[#f6432e]/60': isActiveSortBy(sortBy.view),
              'bg-white text-black hover:bg-white/80': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handeleSortBy(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-[34px] cursor-pointer w-[90px] rounded-sm capitalize inline-block  text-sm ', {
              'bg-[#f6432e] text-white hover:bg-[#f6432e]/60': isActiveSortBy(sortBy.createdAt),
              'bg-white text-black hover:bg-white/80': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handeleSortBy(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-[34px] cursor-pointer w-[90px] rounded-sm capitalize  inline-block text-sm ', {
              'bg-[#f6432e] text-white hover:bg-[#f6432e]/60': isActiveSortBy(sortBy.sold),
              'bg-white text-black hover:bg-white/80': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handeleSortBy(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames(
              'h-[34px] cursor-pointer rounded-sm capitalize inline-block  px-2  text-sm  outline-none',
              {
                'bg-[#f6432e] text-white hover:bg-[#f6432e]/60': isActiveSortBy(sortBy.price),
                'bg-white text-black hover:bg-white/80': !isActiveSortBy(sortBy.price)
              }
            )}
            value={order || ''}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handeleOderPrice(e.target.value as Exclude<productListConfig['order'], undefined>)
            }
          >
            <option className='px-3 bg-white text-black text-sm' value='' disabled>
              Giá
            </option>
            <option className='bg-white text-black text-sm' value={orderPrice.asc}>
              Giá: Thấp đến cao
            </option>
            <option value={orderPrice.desc} className='bg-white text-black text-sm'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='sm:flex items-center gap-5 hidden'>
          <div>
            <span className='text-[#f6432e]'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='flex items-center'>
            {Number(page) === 1 ? (
              <span className='h-8 cursor-not-allowed border-gray-200 border shadow-sm  flex items-center bg-white/60 px-3 rounded-tl-sm rounded-bl-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({ ...queryConfig, page: (Number(page) - 1).toString() }).toString()
                }}
                className='h-8 border-gray-200 border shadow-sm  flex items-center bg-white px-3 rounded-tl-sm rounded-bl-sm'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}
            {Number(page) === pageSize ? (
              <span className='border-gray-200 border h-8 cursor-not-allowed shadow-sm flex items-center  bg-white/50 px-3 rounded-tr-sm rounded-br-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({ ...queryConfig, page: (Number(page) + 1).toString() }).toString()
                }}
                className='border-gray-200 border  h-8 shadow-sm flex items-center  bg-white/60 px-3 rounded-tr-sm rounded-br-sm'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
