import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
// import { omit } from 'lodash'
// cú pháp để tree-tracking
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userAPI from '~/Apis/user.api'
import Button from '~/componet/Button'
import Input from '~/componet/Input'
import { schemeUser, schemeUserType } from '~/utils/validateForm'

type FormState = Pick<schemeUserType, 'password' | 'new_password' | 'confirm_password'>

type FormStateBody = {
  password: string
  new_password: string
}
const schemeUserResolver = schemeUser.pick(['password', 'new_password', 'confirm_password'])
export default function ChangePassword() {
  // update profile
  const updateProfileMutation = useMutation({ mutationFn: userAPI.updateUser })
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<FormState>({
    defaultValues: { password: '', new_password: '', confirm_password: '' },
    resolver: yupResolver(schemeUserResolver)
  })
  const onSubmit = handleSubmit(async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await updateProfileMutation.mutateAsync(omit(data as FormStateBody, ['confirm_password']))
      toast.success(res.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
      reset()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      {
        // if (isAxiosUnprocessableEntity<ErrorResponseAPI<FormDataError>>(error)) {
        //   const formData = error.response?.data.data
        //   if (formData) {
        //     console.log('error', error)
        //     Object.keys(formData).forEach((key) => {
        //       setError(key as keyof FormDataError , {
        //         message: formData[key as keyof FormDataError],
        //         type: 'server'
        //       })
        //     })
        //   }
        // }
        toast.error(error.response.data.data.password)
      }
    }
  })
  return (
    <div className='bg-white rounded-sm shadow-sm px-2 md:px-7 pb-10 md:pb-20 border-gray-200 border'>
      <div className=' py-6 border-b-gray-200 border-b'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Cập nhật mật khẩu</h1>
        <div className='text-sm text-gray-700 mt-1'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form onSubmit={onSubmit} className='max-w-2xl mr-auto mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <div className='mt-6 flex-grow  md:pr-12 md:mt-0 '>
          <div className='flex flex-wrap items-center mt-4'>
            <div className='sm:w-[20%]  mb-4 truncate w-full sm:text-right capitalize'>Mật khẩu</div>
            <div className='w-[80%] sm:pl-5'>
              <Input
                placeholder='Mật khẩu'
                register={register}
                name='password'
                type='password'
                rulesError={errors.password?.message}
                classNameEyePassword='sm:top-[19px] sm:right-[25px] top-[11px] right-[16px]'
                className='relative w-full rounded-sm border-gray-300 sm:px-3 sm:py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              ></Input>
            </div>
          </div>

          <div className='flex flex-wrap items-center mt-4'>
            <div className='sm:w-[20%]  mb-4 truncate w-full sm:text-right capitalize'>Mật khẩu mới</div>
            <div className='w-[80%] sm:pl-5'>
              <Input
                placeholder='Mật khẩu mới'
                register={register}
                name='new_password'
                type='password'
                classNameEyePassword='sm:top-[19px] sm:right-[25px] top-[11px] right-[16px]'
                rulesError={errors.new_password?.message}
                className=' relative w-full rounded-sm border-gray-300 sm:px-3 sm:py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              ></Input>
            </div>
          </div>
          <div className='flex flex-wrap items-center mt-4'>
            <div className='sm:w-[20%]  mb-4 truncate w-full sm:text-right capitalize'>Nhập lại mật khẩu mới</div>
            <div className='w-[80%] sm:pl-5'>
              <Input
                placeholder='Nhập lại mật khẩu mới'
                register={register}
                name='confirm_password'
                type='password'
                rulesError={errors.confirm_password?.message}
                classNameEyePassword='sm:top-[19px] sm:right-[25px] top-[11px] right-[16px]'
                className=' relative w-full rounded-sm border-gray-300 sm:px-3 sm:py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              ></Input>
            </div>
          </div>
          <div className='flex flex-wrap items-center mt-4'>
            <div className='sm:w-[20%] w-full truncate sm:text-right capitalize'></div>
            <div className='w-[80%] sm:pl-5'>
              <Button
                type='submit'
                className='flex h-9 items-center ml-[12px] bg-orangeHeaderTop px-5 text-center text-sm text-white rounded-sm hover:bg-orangeHeaderTop/80'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
