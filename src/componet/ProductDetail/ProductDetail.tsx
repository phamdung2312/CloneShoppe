/* eslint-disable @typescript-eslint/no-var-requires */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import productAPI from '~/Apis/product.api'
import Rating from '../Rating'
import { discountPrice, formatCurrency, formatToSocialStyle, getIdFormNameId } from '~/utils/utils'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { product, productListConfig } from '~/types/products.type'
import ProductItem from '~/page/ProductList/ProductItem'
import QualityControler from '../QualityControler'
import purchasesAPI from '~/Apis/purchases.api'
// import { queryClient } from '~/main'
import { purchasesStatus } from '~/constant/purchases'
import { toast } from 'react-toastify'
import { path } from '~/constant/app.path'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { convert } from 'html-to-text'

/**Khi một sự kiện xảy ra trên một phần tử trong DOM, ví dụ như sự kiện click,
 * sự kiện này không chỉ kích hoạt trên phần tử đó mà còn truyền qua các phần tử con của nó.
 * Sự kiện được truyền từ phần tử con gần nhất lên đến phần tử cha và tiếp tục lên đến các phần
 * tử cha khác cho đến khi nó đạt đến phần tử gốc của cây DOM. */

export default function ProductDetail() {
  const [buyCount, setBuyCount] = useState<number>(1)
  const { t } = useTranslation(['product'])
  const queryClient = useQueryClient()
  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const { nameId } = useParams()
  const navigate = useNavigate()
  const id = getIdFormNameId(nameId as string)

  const { data: productItemData } = useQuery({
    queryKey: ['productdetail', id],
    queryFn: () => productAPI.getProductDetail(id as string)
  })

  const imageRef = useRef<HTMLImageElement>(null)
  const product = productItemData?.data.data

  // getCategory
  const queryConfig: productListConfig = { limit: 10, page: 1, category: product?.category._id }

  const { data: categoryData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productAPI.getProductList(queryConfig),

    staleTime: Infinity,
    enabled: Boolean(product),
    refetchOnWindowFocus: false
  })
  // add to cart
  const addCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchasesAPI.addToCart(body)
  })

  // set main Image cho productDetail (productItem)
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImage) : []),
    [currentIndexImage, product]
  )
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])
  const chooseActiveImage = (img: string) => {
    setActiveImage(img)
  }
  const previewImage = () => {
    if (currentIndexImage[0] > 0) {
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
      console.log('currentIndexImage[0] ', currentIndexImage[0])
    }
  }
  const netviewImage = () => {
    console.log('currentIndexImage[1] ', currentIndexImage[1])
    if (currentIndexImage[1] < (product as product).images.length) {
      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // lấy kích và vị trí của phần tử div
    const react = event.currentTarget.getBoundingClientRect()

    // tọa độ con trỏ chuột
    // cách 1: lấy tọa độ offsetX, offsetY khi chúng ta xư lý bubble event
    // const { offsetX, offsetY } = event.nativeEvent

    // cách 2: lấy tọa độ offsetX, offsetY khi chúng ta chưa xư lý bubble event
    // được sử dụng để tính toán tọa độ của con trỏ chuột tương đối với phần tử <div>.
    const offsetX = event.pageX - (react.x + window.scrollX)
    const offsetY = event.pageY - (react.y + window.scrollY)
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const top = offsetY * (1 - naturalHeight / react.height)
    const left = offsetX * (1 - naturalWidth / react.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'

    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  // handle buy count product
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }
  if (!product) {
    return null
  }
  // handle add to cart
  const addToCart = () => {
    addCartMutation.mutate(
      { product_id: productItemData.data.data._id, buy_count: buyCount },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 1000 })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
        }
      }
    )
  }
  // handle mua ngay
  const handleBuyNow = async () => {
    addCartMutation.mutateAsync(
      { product_id: productItemData.data.data._id, buy_count: buyCount },
      {
        onSuccess: () => {
          navigate(path.cart, {
            state: {
              purchasesId: productItemData.data.data._id
            }
          }),
            queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
        }
      }
    )
  }

  // hàm cắt chuỗi và đặt dấu chấm lửng
  const truncate = (str: string, n: number) => {
    return str.length > n ? str.slice(0, n - 1) + '&hellip;' : str
  }
  console.log('ProductDetail')
  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>{productItemData.data.data.name}</title>
        <meta name='description' content={truncate(convert(productItemData.data.data.description), 110)} />
      </Helmet>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full pt-[100%] cursor-zoom-in shadow overflow-hidden'
                onMouseMove={(e) => handleZoom(e)}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className='absolute top-0 left-0 h-full w-full bg-gray-300 object-cover'
                  ref={imageRef}
                ></img>
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1 h-20'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={previewImage}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img, index) => {
                  const isActive = activeImage === img
                  return (
                    <div
                      className='relative w-full pt-[100%] cursor-pointer'
                      key={index}
                      onMouseEnter={() => {
                        chooseActiveImage(img)
                      }}
                    >
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full bg-gray-300 object-cover'
                      ></img>
                      {isActive && <div className='absolute inset-0 border-2 border-orangeHeaderTop'></div>}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2  bg-black/20 text-white'
                  onClick={netviewImage}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7 overflow-hidden'>
              <h1 className='text-xl font-medium uppercase line-clamp-2'>{product.name}</h1>
              <div className='mt-4 flex items-center'>
                <div className='flex '>
                  <span className='mr-1 border-b border-b-orangeHeaderTop text-orangeHeaderTop'>{product.rating}</span>
                  <Rating
                    rating={product.rating}
                    activeRating='fill-orangeHeaderTop text-orangeHeaderTop h-4 w-4'
                    nonactiveRating='fill-gray-300 text-gray-300 h-4 w-4'
                  ></Rating>
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div className=''>
                  <span>{formatToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500 capitalize'>Đã bán </span>
                </div>
              </div>
              <div className='mt-4 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through '>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='text-orangeHeaderTop ml-3 text-3xl font-medium '>₫{formatCurrency(product.price)}</div>
                <div
                  className='bg-orangeHeaderTop text-white uppercase px-1 py-[2px] font-semibold ml-6 rounded-sm
                '
                >
                  {discountPrice(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className=' mt-4 flex items-center '>
                <div className='capitalize text-gray-500'>Số lượng</div>

                <QualityControler
                  max={product.quantity}
                  onIncrease={handleBuyCount}
                  onDecrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                ></QualityControler>
                <div className='text-gray-500 ml-3'>
                  {product.quantity} {t('avaliable')}
                </div>
              </div>
              <div className=' mt-4 flex items-center'>
                <button
                  className='flex shrink-0 h-12 items-center justify-center rounded-sm border px-5 border-orangeHeaderTop bg-orangeHeaderTop/10 capitalize text-orangeHeaderTop shadow-sm hover:bg-orangeHeaderTop/15 cursor-pointer'
                  onClick={addToCart}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5 mr-3'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  className='flex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orangeHeaderTop px-10 capitalize text-white shadow-sm outline hover:bg-orangeHeaderTop/90'
                  onClick={handleBuyNow}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 shadow mt-8'>
          <div className='rounded bg-gray-50 p-4 capitalize text-slate-700'>Mô tả sản phẩm</div>
          <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
            <div className='' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></div>
          </div>
        </div>
        <div className='uppercase text-xl text-gray-500 mt-8'>
          <span>Các sản phẩm khác liên quan</span>{' '}
          <div className=' grid grid-cols-2 mt-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
            {categoryData &&
              categoryData.data.data.products.map((product, index) => (
                <div className='col-span-1' key={index}>
                  <ProductItem productData={product}></ProductItem>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
