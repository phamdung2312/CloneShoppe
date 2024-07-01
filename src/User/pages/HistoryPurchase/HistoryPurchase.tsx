import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import purchasesAPI from '~/Apis/purchases.api'
import UesQueryParams from '~/Hooks/UesQueryParams'
import { path } from '~/constant/app.path'
import { purchasesStatus } from '~/constant/purchases'
import { purchasesStatusList } from '~/types/purchases.type'
import { formatCurrency, generateNameId } from '~/utils/utils'

export default function HistoryPurchase() {
  const { status } = UesQueryParams()
  const changeNumberStatus = Number(status) || purchasesStatus.allCart

  const { data: purchaseData } = useQuery({
    queryKey: ['purchases', { changeNumberStatus }],
    queryFn: () => purchasesAPI.getPurchase({ status: changeNumberStatus as purchasesStatusList })
  })
  console.log('purchaseData', purchaseData)
  const storeStatusPurchase = [
    { status: purchasesStatus.allCart, name: 'Tất cả' },
    { status: purchasesStatus.waitForComfirmation, name: 'Chờ xác nhận' },
    { status: purchasesStatus.waitForGeting, name: 'Chờ lấy hàng' },
    { status: purchasesStatus.inProgress, name: 'Đang xử lý' },
    { status: purchasesStatus.delivered, name: 'Đã giao hàng' },
    { status: purchasesStatus.canceled, name: 'Đã hủy' }
  ]

  const RenderStatusPurchase = storeStatusPurchase.map((statusPurchase) => (
    <Link
      key={statusPurchase.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(statusPurchase.status)
        }).toString()
      }}
      className={classNames(
        'hover:text-orangeHeaderTop flex text-[17px] flex-1 items-center justify-center border-b-2 bg-white py-4 text-center',
        {
          'border-b-orangeHeaderTop text-orangeHeaderTop': changeNumberStatus === statusPurchase.status,
          'border-b-gray-200 text-gray-800': changeNumberStatus !== statusPurchase.status
        }
      )}
    >
      {statusPurchase.name}
    </Link>
  ))

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          {' '}
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{RenderStatusPurchase}</div>
          <div>
            {purchaseData &&
              purchaseData.data.data.map((purchase, index) => (
                <div key={index} className='border rounded-sm  shadow-sm bg-white mt-4 p-6 flex'>
                  <Link
                    className='h-20  flex-shrink-0 w-full grid-cols-12 grid'
                    to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  >
                    <div className='col-span-8 flex '>
                      <img
                        className='w-20 h-20 object-cover'
                        alt={purchase.product.name}
                        src={purchase.product.image}
                      ></img>
                      <div className='flex-col flex ml-5 text-[19px] '>
                        <span className=' mb-5 text-black font-sans line-clamp-2 leading-5'>
                          {purchase.product.name}
                        </span>
                        <span className='text-[15px]'>x{purchase.buy_count}</span>
                      </div>
                    </div>

                    <div className='flex ml-auto text-[16px] items-center justify-between flex-col col-span-4'>
                      <div>
                        <span className='mr-3 line-through'>
                          ₫{formatCurrency(purchase.product.price_before_discount)}
                        </span>
                        <span className='text-orangeHeaderTop'>₫{formatCurrency(purchase.product.price)}</span>
                      </div>
                      <div className=' text-lg text-black'>
                        Thành tiền:{' '}
                        <span className='text-orangeHeaderTop font-semibold'>
                          ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
