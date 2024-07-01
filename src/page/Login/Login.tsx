import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { scheme, schemeType } from '~/utils/validateForm'
import { yupResolver } from '@hookform/resolvers/yup'
import authAPI from '~/Apis/auth.api'

import { isAxiosUnprocessableEntity } from '~/utils/utils'
import { ErrorResponseAPI } from '~/types/utils.type'
import Input from '~/componet/Input'
import { useContext } from 'react'
import { AppContext } from '~/Context/app.context'
import Button from '~/componet/Button'
import { path } from '~/constant/app.path'
import { Helmet } from 'react-helmet-async'

type FormState = Pick<schemeType, 'email' | 'password'>
const schemeResolver = scheme.pick(['email', 'password'])

export default function Login() {
  const { setIsauthenticated, setIsUserAuthenticated } = useContext(AppContext)

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemeResolver)
  })
  const loginMutation = useMutation({
    mutationFn: (body: FormState) => {
      return authAPI.loginUser(body)
    }
  })
  const onSubmitHandle = handleSubmit((data) => {
    console.log('data', data)
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log('login', data)
        setIsUserAuthenticated(data.data.data.user)
        setIsauthenticated(true)

        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ErrorResponseAPI<Omit<schemeType, 'confirm_password'>>>(error)) {
          const formData = error.response?.data.data
          if (formData) {
            Object.keys(formData).forEach((key) => {
              setError(key as keyof Omit<FormState, 'confirm_password'>, {
                message: formData[key as keyof Omit<schemeType, 'confirm_password'>],
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
        <title>Đăng nhập | Clone Shoppe</title>
        <meta name='description' content='Đăng nhập trang shopee để thực hiện những yêu cầu từ trang web' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form action='' className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmitHandle} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                name='email'
                register={register}
                rulesError={errors.email?.message}
              ></Input>
              <Input
                className='mt-3 relative'
                classNameEyePassword='top-[10px] right-[16px]'
                type='password'
                placeholder='password'
                name='password'
                register={register}
                autoComplete='on'
                rulesError={errors.password?.message}
              ></Input>
              <div className='mt-5'>
                <Button
                  isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                  type='submit'
                  className='w-full flex items-center justify-center bg-[#f6432e] text-center py-4 px-2 unpercase text-white hover:brightness-90 rounded'
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex justify-center'>
                <span className='text-gray-400 text-sm '> Bạn đã có tài khoản? </span>
                <Link to={path.register} className='text-sm text-[#f6432e] ml-[5px]'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
