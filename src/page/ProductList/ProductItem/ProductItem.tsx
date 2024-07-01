import { Link } from 'react-router-dom'
import Rating from '~/componet/Rating'
import { path } from '~/constant/app.path'
import { product } from '~/types/products.type'
import { formatCurrency, formatToSocialStyle, generateNameId } from '~/utils/utils'
interface productItemProps {
  productData: product
}
export default function ProductItem(props: productItemProps) {
  return (
    <Link to={`${path.home}${generateNameId({ name: props.productData.name, id: props.productData._id })}`}>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-1px] hover:shadow-md duration-100 transition-transform'>
        <div className='w-full pt-[100%] relative'>
          <img
            src={props.productData.image}
            alt=''
            className='absolute top-0 left-0 bg-white w-full h-full rounded-sm overflow-hidden object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden '>
          <div className='min-h-[1.75rem] line-clamp-2 text-xs '>{props.productData.name}</div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>₫</span>
              <span className='text-[13px]'>{formatCurrency(props.productData.price_before_discount)}</span>
            </div>
            <div className='ml-1 text-[#f6432e] truncate'>
              <span className='text-xs'>₫</span>
              <span className=''>{formatCurrency(props.productData.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <Rating rating={props.productData.rating}></Rating>
            <div className='ml-1 text-sm text-gray-500 mt-[1px]'>
              <span className='mr-1'>{formatToSocialStyle(props.productData.sold)}</span>
              <span>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
