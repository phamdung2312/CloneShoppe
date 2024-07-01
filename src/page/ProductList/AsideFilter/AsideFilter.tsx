import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from '~/componet/Button'
import { path } from '~/constant/app.path'
import { QueryConfig } from '../ProductList'
import { categoryType } from '~/types/category'
import classNames from 'classnames'
import InputNumber from '~/componet/componetNumber/InputNumber'
import { Controller, useForm } from 'react-hook-form'
import { scheme, schemeType } from '~/utils/validateForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { ObjectSchema } from 'yup'
import { NoUnderfinedField } from '~/types/utils.type'
import RatingFilter from '~/componet/RatingFilter'

// import i18n from '~/I18next/I18next'

// import { omit } from 'lodash'
// cú pháp để tree-tracking
import omit from 'lodash/omit'
import { useTranslation } from 'react-i18next'
// import InputNumberV2 from '~/componet/InputNumberV2/InputNumberV2'

interface AsideFilterProps {
  queryConfig: QueryConfig
  category: categoryType[] | undefined
}
type FormInputNumber = NoUnderfinedField<Pick<schemeType, 'min_price' | 'max_price'>>

/**Rule validate InputNumber
 * Nếu có max_price và min_price thì max_price > min_price
 * Còn không thì có max_price thì không có min_price và ngược lại
 */

const priceSchema = scheme.pick(['max_price', 'min_price'])
console.log('sdie')

export default function AsideFilter({ queryConfig, category: categoryData }: AsideFilterProps) {
  const { category: categoryDataParam } = queryConfig
  const { t } = useTranslation('home')
  const navigate = useNavigate()
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm({
    defaultValues: {
      max_price: '',
      min_price: ''
    },
    resolver: yupResolver<FormInputNumber>(priceSchema as ObjectSchema<FormInputNumber>),
    shouldFocusError: true
  })

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({ ...queryConfig, price_max: data.max_price, price_min: data.min_price }).toString()
    })
  })

  const handleRemoveFilter = () => {
    reset()
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['rating_filter', 'category', 'price_max', 'price_min'])).toString()
    })
  }
  // const watchRes = watch()

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('capitalize flex justify-start items-center font-bold', {
          'text-[#f6432e]': !categoryDataParam
        })}
      >
        <svg viewBox='0 0 12 10' className='w-3 h-4 mr-2 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        {t('aside filter.all category')}
      </Link>
      <div className='h-[1px] mt-4 mb-2 bg-gray-300'></div>
      <ul>
        {categoryData &&
          categoryData.map((categoryItem) => {
            const isActive = categoryDataParam === categoryItem._id
            return (
              <li key={categoryItem._id} className=''>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({ ...queryConfig, category: categoryItem._id }).toString()
                  }}
                  className={classNames('capitalize flex items-center justify-start text-sm py-[8px]', {
                    'text-[#f6432e]': isActive
                  })}
                >
                  {isActive && (
                    <svg viewBox='0 0 4 7' className='w-3 h-2 mr-1 fill-[#f6432e] pb-[1px]'>
                      <polygon points='4 3.5 0 0 0 7' />
                    </svg>
                  )}

                  {categoryItem.name}
                </Link>
              </li>
            )
          })}
      </ul>
      <Link to={path.home} className='uppercase flex justify-start items-center font-bold mt-7'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='w-3 h-4 mr-2 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        {t('aside filter.filter search')}
      </Link>
      <div className='h-[1px] mt-4 mb-2 bg-gray-300'></div>
      <div className='pt-2'>
        <span className='text-sm'>Khoảng giá</span>
        <form action='' className='py-4' onSubmit={onSubmit}>
          <div className='flex '>
            <Controller
              name='min_price'
              control={control}
              render={({ field }) => (
                <InputNumber
                  // rulesError={errors.max_price?.message}
                  type='text'
                  placeholder='đ TỪ'
                  classNameInput='text-sm p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('max_price')
                  }}
                  value={field.value}
                  ref={field.ref}
                ></InputNumber>
              )}
            ></Controller>

            <div className='px-8 mt-[4px] text-gray-500'> - </div>
            <Controller
              name='max_price'
              control={control}
              render={({ field }) => (
                <InputNumber
                  type='text'
                  placeholder='đ ĐẾN'
                  classNameInput='text-sm p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  onChange={(event) => {
                    field.onChange(event)
                    //dùng để validate input còn lại vì đối với cơ chế của react hook form thì chỉ
                    // validate input mà ta thay đổi giá trị của nó mà thôi
                    trigger('min_price')
                  }}
                  value={field.value}
                  ref={field.ref}
                ></InputNumber>
              )}
            ></Controller>
          </div>
          <div className='mb-[12px] mt-[-12px] text-center'>
            <span className='text-red-600 text-[14px]'>{errors.min_price?.message}</span>
          </div>
          <Button
            type='submit'
            className='text-sm w-full flex items-center justify-center bg-[#f6432e] text-center py-2 px-2 uppercase text-white hover:brightness-90 rounded'
          >
            áp dụng
          </Button>
        </form>
        <div className='h-[1px] mt-4 mb-2 bg-gray-300'></div>

        <RatingFilter queryConfig={queryConfig}></RatingFilter>
        <div className='h-[1px] mt-4 mb-2 bg-gray-300'></div>
        <div className='py-4'>
          <Button
            onClick={handleRemoveFilter}
            className='text-sm w-full flex items-center justify-center bg-[#f6432e] text-center py-2 px-2 uppercase text-white hover:brightness-90 rounded'
          >
            Xóa tất cả
          </Button>
        </div>
      </div>
    </div>
  )
}
