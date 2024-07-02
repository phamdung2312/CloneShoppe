import { produce } from 'immer'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router-dom'
import purchasesAPI from '~/Apis/purchases.api'
import { path } from '~/constant/app.path'
import { purchasesStatus } from '~/constant/purchases'
import { formatCurrency, generateNameId } from '~/utils/utils'
import QualityControler from '../QualityControler'
import { useContext, useEffect, useMemo } from 'react'
import { purchases } from '~/types/purchases.type'
// lodash không có tính năng treetracking
// import { keyBy } from 'lodash'

// fix để có tree-tracking (chỉ import mỗi funtioin keyBy)
import keyBy from 'lodash/keyBy'

import { toast } from 'react-toastify'
import classNames from 'classnames'
import { AppContext } from '~/Context/app.context'
import { Helmet } from 'react-helmet-async'

export interface extendedPurchasesType extends purchases {
  disible: boolean
  checked: boolean
}

export default function Cart() {
  // const [extendedPurchases, setExTendedPurchases] = useState<extendedPurchasesType[]>([])
  const { extendedPurchases, setExTendedPurchases } = useContext(AppContext)

  // getPurchasesInCart
  const { data: purchaseIncartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchasesAPI.getPurchase({ status: purchasesStatus.inCart })
  })

  // const
  const location = useLocation()

  const purchaseBuynowID = location.state?.purchasesId

  const checkPurchases = extendedPurchases.filter((purchase) => purchase.checked)

  const totalCheckPurchases = useMemo(
    () => checkPurchases.reduce((sum, purchase) => sum + purchase.price * purchase.buy_count, 0),
    [checkPurchases]
  )
  const countCheckPurchases = checkPurchases.length

  // updatePurchases
  const updatePurchasesMutation = useMutation({
    mutationFn: purchasesAPI.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  // Delete product
  const deletePurchasesMutation = useMutation({
    mutationFn: purchasesAPI.deletePurchases,
    onSuccess: () => {
      refetch()
    }
  })
  // Buy product
  const buyPurchasestMutation = useMutation({
    mutationFn: purchasesAPI.buyPurchases,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, { position: 'top-center', autoClose: 1000 })
    }
  })

  useEffect(() => {
    setExTendedPurchases((prev) => {
      const extendPurchasesObject = keyBy(prev, '_id')
      return (
        purchaseIncartData?.data.data?.map((purchase) => {
          const isPurchaseBuynowID = purchaseBuynowID === purchase.product._id

          return {
            ...purchase,
            disible: false,
            checked: isPurchaseBuynowID || Boolean(extendPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchaseIncartData?.data.data, purchaseBuynowID, setExTendedPurchases])
  // clear state in location
  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleChangeInputCheck = (purChaseIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExTendedPurchases(
      produce((draft) => {
        draft[purChaseIndex].checked = e.target.checked
      })
    )
  }
  // handleAllCheck
  const handleAllCheck = () => {
    setExTendedPurchases((prev) => prev.map((purchase) => ({ ...purchase, checked: !isAllCheck })))
  }

  // checked
  const isAllCheck = extendedPurchases.every((purchase) => purchase.checked)
  // handleQuantity
  const handleQuantity = (purChaseIndex: number, value: number, enabled: boolean) => {
    console.log('value', value)
    if (enabled) {
      const purchase = extendedPurchases[purChaseIndex]
      setExTendedPurchases(
        produce((draft) => {
          draft[purChaseIndex].disible = true
        })
      )
      updatePurchasesMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleType = (purChaseIndex: number) => (value: number) => {
    setExTendedPurchases(
      produce((draft) => {
        draft[purChaseIndex].buy_count = value
      })
    )
  }

  // handle xóa một sản phẩm
  const handleDeletePurChase = (purChaseId: string) => {
    deletePurchasesMutation.mutate([purChaseId])
  }
  // handle xóa nhiều sản phẩm
  const handleDeletePurChases = () => {
    const productDeletes = checkPurchases.map((purChase) => purChase._id)
    deletePurchasesMutation.mutate(productDeletes)
  }
  // handle mua sản phẩm
  const handlePurchases = () => {
    const body = checkPurchases.map((purchase) => ({ product_id: purchase.product._id, buy_count: purchase.buy_count }))
    buyPurchasestMutation.mutate(body)
  }

  console.log('render')

  return (
    <div className='bg-neutral-100 py-16'>
      <Helmet>
        <title>Giỏ hàng | Shoppe clone</title>
        <meta
          name='description'
          content='Giỏ hàng chứa một số mặt hàng được bán với chất lượng sản phẩm cao, uy tín và chất lượng'
        />
      </Helmet>
      {extendedPurchases && extendedPurchases.length > 0 ? (
        <div className='container'>
          <div className='overflow-auto'>
            <div className='min-w-[1000px]'>
              <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                <div className='col-span-6'>
                  <div className='flex items-center'>
                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                      <input
                        type='checkbox'
                        className='h-5 w-5 accent-orangeHeaderTop'
                        checked={isAllCheck ? true : false}
                        onChange={handleAllCheck}
                      ></input>
                    </div>
                    <div className='flex-grow text-black'>Sản phẩm</div>
                  </div>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-5 capitalize'>
                    <span className='col-span-2 flex justify-center'>Đơn Giá </span>
                    <span className='col-span-1  flex justify-center'>Số Lượng</span>
                    <span className='col-span-1  flex justify-center'>Số Tiền</span>
                    <span className='col-span-1  flex justify-center'>Thao Tác</span>
                  </div>
                </div>
              </div>
              {extendedPurchases.length > 0 && (
                <div className='my-3 rounded-sm bg-white p-5 shadow'>
                  {extendedPurchases?.map((purchase, index) => (
                    <div
                      key={index}
                      className='grid first:mt-0 mt-3 grid-cols-12 rounded-sm border-2 border-gray-300 bg-white py-5 px-4 text-center text-small text-gray-500'
                    >
                      <div className='col-span-6 overflow-auto'>
                        <div className='flex'>
                          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                            <input
                              type='checkbox'
                              className='h-5 w-5 accent-orangeHeaderTop'
                              checked={purchase.checked}
                              onChange={handleChangeInputCheck(index)}
                            ></input>
                          </div>
                          <div className='flex-grow'>
                            <div className='flex'>
                              <Link
                                className='h-20 w-20 flex-shrink-0'
                                to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                              >
                                <img alt={purchase.product.name} src={purchase.product.image}></img>
                              </Link>
                              <div className='flex-grow px-2 pt-1 pb-2'>
                                <Link
                                  className='line-clamp-2'
                                  to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                                >
                                  {purchase.product.name}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-6 '>
                        <div className='grid grid-cols-5 items-center'>
                          <div className='col-span-2'>
                            <div className='flex items-center justify-center'>
                              <span className='text-gray-300 line-through'>
                                ₫{formatCurrency(purchase.product.price_before_discount)}
                              </span>
                              <span className='text-gray-300 ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                            </div>
                          </div>
                          <div className='col-span-1'>
                            <QualityControler
                              value={purchase.buy_count}
                              max={purchase.product.quantity}
                              classNameWrapper='flex justify-center'
                              onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                              onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                              disabled={purchase.disible}
                              onType={handleType(index)}
                              onFocused={(value) =>
                                handleQuantity(
                                  index,
                                  value,
                                  value >= 1 &&
                                    value <= purchase.product.quantity &&
                                    value !== (purchaseIncartData?.data.data as purchases[])[index].buy_count
                                )
                              }
                            ></QualityControler>
                          </div>
                          <div className='col-span-1'>
                            <span className='text-orangeHeaderTop'>
                              ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                            </span>
                          </div>
                          <div className='col-span-1'>
                            <button
                              className='bg-none text-black transition-colors hover:text-orangeHeaderTop'
                              onClick={() => handleDeletePurChase(purchase._id)}
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='sticky bottom-0 z-10 border-gray-100 flex flex-col items-center rounded-sm shadow border bg-white p-5 justify-between sm:flex-row'>
            <div className=' flex'>
              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                <input
                  type='checkbox'
                  className='h-5 w-5 accent-orangeHeaderTop'
                  checked={isAllCheck}
                  onChange={handleAllCheck}
                ></input>
              </div>
              <button className='mx-3 borde-none bg-none'>Chọn tất cả ({extendedPurchases.length})</button>
              <button
                className='mx-3 capitalize hover:text-orangeHeaderTop borde-none bg-none'
                onClick={handleDeletePurChases}
              >
                xóa
              </button>
            </div>
            <div className='flex items-center flex-col sm:flex-row'>
              <div className='flex mr-4 sm:my-0 my-4'>
                <div className=''>Tổng thanh toán({countCheckPurchases} Sản phẩm): </div>
                <span className='ml-2 text-orangeHeaderTop text text-[24px]'>
                  ₫{formatCurrency(totalCheckPurchases)}
                </span>
              </div>
              <button
                className={classNames(
                  'capitalize text-white px-14 py-3 rounded bg-orangeHeaderTop hover:bg-orangeHeaderTop/35',
                  {
                    'bg-orangeHeaderTop/35': buyPurchasestMutation.isPending
                  }
                )}
                onClick={handlePurchases}
                disabled={buyPurchasestMutation.isPending}
              >
                Mua hàng
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center flex-row'>
          <div>
            <img
              className='w-[8%] mx-auto'
              src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/c44984f18d2d2211.png'
              alt=''
            />
          </div>
          <div className='my-6 font-semibold text-gray-500'>
            <span>Giỏ hàng của bạn còn trống</span>
          </div>
          <div className=''></div>
          <a className='px-[42px] py-[10px] rounded-sm bg-orangeHeaderTop text-white uppercase cursor-pointer hover:bg-orangeHeaderTop/60'>
            mua ngay
          </a>
        </div>
      )}
    </div>
  )
}
