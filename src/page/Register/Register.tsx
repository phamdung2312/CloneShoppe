import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { scheme, schemeType } from '~/utils/validateForm'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '~/componet/Input'
import { useMutation } from '@tanstack/react-query'
import authAPI from '~/Apis/auth.api'
// import { omit } from 'lodash'
// cú pháp để tree-tracking
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntity } from '~/utils/utils'
import { ErrorResponseAPI } from '~/types/utils.type'
import Button from '~/componet/Button'
import { path } from '~/constant/app.path'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'

const schemeResolver = scheme.pick(['email', 'password', 'confirm_password'])
// export type FormState = {
//   email: string
//   password: string
//   confirm_password: string
// }
export type FormState = Pick<schemeType, 'email' | 'password' | 'confirm_password'>
type resgiterStateForm = Omit<schemeType, 'confirm_password'>
export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormState>({
    resolver: yupResolver(schemeResolver)
  })
  const registerMutation = useMutation({
    mutationFn: (body: Omit<schemeType, 'confirm_password'>) => {
      console.log('body', body)
      return authAPI.registerUser(body)
    }
  })
  const onSubmit = handleSubmit((data) => {
    console.log('onSubmit', data)
    const body = omit(data, ['confirm_password'])
    registerMutation.mutate(body as resgiterStateForm, {
      onSuccess: (data) => toast.success(data.data.message),
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ErrorResponseAPI<Omit<FormState, 'confirm_password'>>>(error)) {
          const formData = error.response?.data.data
          if (formData) {
            console.log('error', error)
            Object.keys(formData).forEach((key) => {
              setError(key as keyof Omit<FormState, 'confirm_password'>, {
                message: formData[key as keyof Omit<FormState, 'confirm_password'>],
                type: 'server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-[#f6432e]'>
      <Helmet>
        <title>Đăng ký | Clone Shoppe</title>
        <meta name='description' content='Đăng ký trang shopee để thực hiện những yêu cầu từ trang web' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form action='' className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                name='email'
                register={register}
                rulesError={errors.email?.message}
              ></Input>
              <Input
                className='relative mt-3'
                type='password'
                placeholder='password'
                name='password'
                register={register}
                autoComplete='on'
                rulesError={errors.password?.message}
                classNameEyePassword='top-[10px] right-[16px]'
              ></Input>
              <Input
                className='relative mt-3'
                type='password'
                placeholder='confirm password'
                name='confirm_password'
                register={register}
                autoComplete='on'
                rulesError={errors.confirm_password?.message}
                classNameEyePassword='top-[10px] right-[16px]'
              ></Input>
              {/* <div className='mt-3'>
                <input
                  type='password'
                  placeholder='confirm password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  autoComplete='on'
                  {...register('confirm_password', {
                    ...rules.confirm_password
                  })}
                />
                <div className=' text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
              </div> */}
              <div className='mt-5'>
                <Button
                  disabled={registerMutation.isPending}
                  isLoading={registerMutation.isPending}
                  type='submit'
                  className='w-full flex items-center justify-center bg-[#f6432e] text-center py-4 px-2 unpercase text-white hover:brightness-90 rounded'
                >
                  Đăng ký
                </Button>
              </div>
              <div className='mt-8 flex justify-center'>
                <span className='text-gray-400 text-sm '> Bạn đã có tài khoản? </span>
                <Link to={path.login} className='text-sm text-[#f6432e] ml-[5px]'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
