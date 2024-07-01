import classNames from 'classnames'

import { Link, createSearchParams } from 'react-router-dom'
import { path } from '~/constant/app.path'
import { QueryConfig } from '~/page/ProductList/ProductList'

interface panigationProps {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2

export default function Panigation({ queryConfig, pageSize }: panigationProps) {
  const page = Number(queryConfig.page)
  // chỉ rander <>...</> render ra 1 lần
  const renderPanigation = () => {
    let dotBefore = false
    let dotAffter = false
    const renderBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='bg-white py-1 px-2 rounded-sm border-gray-300 border'>
            ...
          </span>
        )
      }
      return null
    }
    const renderAfter = (index: number) => {
      if (!dotAffter) {
        dotAffter = true
        return (
          <span key={index} className='bg-white py-1 px-2 rounded-sm border-gray-300 border'>
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber > RANGE && pageNumber < page - RANGE) {
            return renderBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderAfter(index)
          }
        } else if (page > pageSize - (RANGE * 2 + 1) && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({ ...queryConfig, page: pageNumber.toString() }).toString()
            }}
            key={index}
            className={classNames('bg-white py-1 px-2 rounded-sm border-gray-300 border', {
              'border-red-400 border': page === pageNumber
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='w-full flex items-center justify-center mt-4 text-xs gap-2  '>
      {page === 1 ? (
        <button
          disabled={Boolean(page === 1)}
          onClick={() => console.log(alert(123))}
          className='bg-white py-1 px-2 rounded-sm border-gray-300 border cursor-not-allowed bg-white/60 text-gray-400'
        >
          Prev
        </button>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({ ...queryConfig, page: (page - 1).toString() }).toString()
          }}
          className='bg-white py-1 px-2 rounded-sm border-gray-300 border'
        >
          Prev
        </Link>
      )}
      {renderPanigation()}
      {page === pageSize ? (
        <button
          disabled={Boolean(page === pageSize)}
          onClick={() => console.log(alert(123))}
          className='bg-white py-1 px-2 rounded-sm border-gray-300 border cursor-not-allowed bg-white/60 text-gray-400'
        >
          Prev
        </button>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({ ...queryConfig, page: (page + 1).toString() }).toString()
          }}
          className='bg-white py-1 px-2 rounded-sm border-gray-300 border'
        >
          Prev
        </Link>
      )}
    </div>
  )
}
