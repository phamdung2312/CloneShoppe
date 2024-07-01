import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
import { FormState } from '~/page/Register/Register'
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
export const getRules = (getValues?: UseFormGetValues<FormState>): Rules => ({
  email: {
    required: { value: true, message: 'Bắt buộc nhập email' },
    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email không đúng' },
    maxLength: { value: 160, message: 'Email nằm trong khoảng 5 - 160 ký tự' },
    minLength: { value: 5, message: 'Email nằm trong khoảng 5 - 160 ký tự' }
  },
  password: {
    required: { value: true, message: 'Bắt buộc nhập mật khẩu' },
    maxLength: { value: 160, message: 'Mật khẩu nằm trong khoảng 6 - 160 ký tự' },
    minLength: { value: 6, message: 'Mật khẩu nằm trong khoảng 6 - 160 ký tự' }
  },
  confirm_password: {
    required: { value: true, message: 'Bắt buộc confirm mật khẩu' },
    maxLength: { value: 160, message: 'Mật khẩu nằm trong khoảng 6 - 160 ký tự' },
    minLength: { value: 5, message: 'Mât khẩu nằm trong khoảng 6 - 160 ký tự' },
    validate:
      typeof getValues === 'function' ? (value) => value === getValues('password') || 'Mật khẩu không khớp' : undefined
  }
})

// Validate with scheme

function validateMinMaxPrice(this: yup.TestContext<yup.AnyObject>) {
  const { max_price, min_price } = this.parent as { max_price: string; min_price: string }
  if (min_price !== '' && max_price !== '') {
    return Number(max_price) >= Number(min_price)
  }
  return min_price !== '' || max_price !== ''
}
function conformPassword(refString: string) {
  return yup
    .string()
    .required('Mật khẩu bắt buộc nhập')
    .min(6, 'Mật khẩu nằm trong khoảng 5 - 160 ký tự')
    .max(160, 'Mật khẩu nằm trong khoảng 5 - 160 ký tự')
    .oneOf([yup.ref(refString)], 'Mật khẩu không trùng khớp')
}

export const scheme = yup.object({
  email: yup
    .string()
    .required('Email bắt buộc nhập')
    .email('Email không đúng định dạng')
    .min(5, 'Email nằm trong khoảng 5 - 160 ký tự')
    .max(160, 'Email nằm trong khoảng 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Mật khẩu bắt buộc nhập')
    .min(6, 'Mật khẩu nằm trong khoảng 6 - 160 ký tự')
    .max(160, 'Mật khẩu nằm trong khoảng 6 - 160 ký tự'),
  confirm_password: conformPassword('password'),
  min_price: yup.string().test({
    name: 'price-not-allowed',
    message: 'Khoảng giá không phù hợp',
    test: validateMinMaxPrice
  }),
  max_price: yup.string().test({
    name: 'price-not-allowed',
    message: 'Khoảng giá không phù hợp',
    test: validateMinMaxPrice
  }),
  name: yup.string().required('Mật khẩu bắt buộc nhập').trim()
})

// schemeUser

export const schemeUser = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 kí tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn ngày trong quá khứ'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 kí tự'),
  password: scheme.fields['password'],
  new_password: scheme.fields['password'],
  confirm_password: conformPassword('new_password')
})

export type schemeUserType = yup.InferType<typeof schemeUser>
export type schemeType = yup.InferType<typeof scheme>
