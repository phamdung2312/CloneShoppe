import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import userAPI from '~/Apis/user.api'
import { AppContext } from '~/Context/app.context'
import DateSelect from '~/User/componet/DateSeclect'
import Button from '~/componet/Button'
import Input from '~/componet/Input'
import InputFile from '~/componet/InputFile'
import InputNumber from '~/componet/componetNumber'

import { setUserLocal } from '~/utils/auth'
import { createURL } from '~/utils/utils'
import { schemeUser, schemeUserType } from '~/utils/validateForm'

type FormState = Pick<schemeUserType, 'name' | 'address' | 'avatar' | 'phone' | 'date_of_birth'>
// type FormDataError = Omit<FormData, 'date_of_birth'> & {
//   date_of_birth?: string
// }

const schemeUserResolver = schemeUser.pick(['name', 'address', 'avatar', 'phone', 'date_of_birth'])

function Info() {
  const {
    register,
    formState: { errors },
    control
  } = useFormContext<FormState>()
  return (
    <Fragment>
      <div className='flex flex-wrap mt-4 items-center'>
        <div className='w-full sm:w-[20%] truncate sm:text-right capitalize mb-4'>Tên</div>
        <div className='w-[80%] sm:pl-5'>
          <Input
            register={register}
            name='name'
            placeholder='Tên'
            rulesError={errors.name?.message}
            className='w-full rounded-sm border-gray-300 sm:px-3 sm:py-2 outline-none focus:border-gray-500 focus:shadow-sm'
          ></Input>
        </div>
      </div>
      <div className='flex flex-wrap items-center mt-4'>
        <div className='sm:w-[20%]  mb-4 w-full truncate sm:text-right capitalize'>Số điện thoại</div>
        <div className='w-[80%] sm:pl-5'>
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                placeholder='Số điện thoại'
                onChange={field.onChange}
                name='phone'
                rulesError={errors.phone?.message}
                className='w-full rounded-sm border-gray-300 sm:px-3 sm:py-2 outline-none focus:border-gray-500 focus:shadow-sm'
              ></InputNumber>
            )}
          ></Controller>
        </div>
      </div>
    </Fragment>
  )
}

export default function Profile() {
  const [file, setFile] = useState<File>()
  const { setIsUserAuthenticated } = useContext(AppContext)

  const previewsFile = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const { data: userData, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => await userAPI.getUser()
  })
  // update profile
  const updateProfileMutation = useMutation({ mutationFn: userAPI.updateUser })
  const updateProfileAvatarMutation = useMutation({ mutationFn: userAPI.updateAvatar })
  const dataProfile = useMemo(() => userData?.data.data, [userData])

  const methods = useForm<FormState>({
    defaultValues: { name: '', address: '', phone: '', avatar: '', date_of_birth: new Date(1990, 0, 1) },
    resolver: yupResolver(schemeUserResolver)
  })

  const {
    watch,
    handleSubmit,
    setValue,
    register,
    control,
    formState: { errors }
  } = methods
  const avatar = watch('avatar')
  useEffect(() => {
    if (dataProfile) {
      setValue('name', dataProfile.name)
      setValue('address', dataProfile.address)
      setValue('avatar', dataProfile.avatar)
      setValue('phone', dataProfile.phone)
      setValue('date_of_birth', dataProfile.date_of_birth ? new Date(dataProfile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [dataProfile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    let avatarName = avatar
    try {
      if (file) {
        const formData = new FormData()
        formData.append('image', file)
        const upLoad = await updateProfileAvatarMutation.mutateAsync(formData)
        avatarName = upLoad.data.data
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      refetch()
      toast.success(res.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
      setUserLocal(res.data.data)
      setIsUserAuthenticated(res.data.data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      {
        toast.error(error.response.data.data.phone)
      }
    }
  })
  const handleFileChange = (file?: File) => {
    setFile(file)
  }

  return (
    <div className='bg-white rounded-sm shadow-sm px-2 md:px-7 pb-10 md:pb-20 border-gray-200 border'>
      <div className=' py-6 border-b-gray-200 border-b'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='text-sm text-gray-700 mt-1'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
          <div className='mt-6 flex-grow  md:pr-12 md:mt-0'>
            <div className='flex flex-wrap mt-4'>
              <div className='sm:w-[20%]  w-full truncate pt-3 sm:text-right capitalize'>Email</div>
              <div className='w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>{dataProfile?.email}</div>
              </div>
            </div>

            <Info></Info>
            <div className='flex flex-wrap items-center mt-4'>
              <div className='sm:w-[20%]  mb-4 truncate w-full sm:text-right capitalize'>Địa chỉ</div>
              <div className='w-[80%] sm:pl-5'>
                <Input
                  placeholder='Địa chỉ'
                  register={register}
                  name='address'
                  rulesError={errors.address?.message}
                  className='w-full rounded-sm border-gray-300 sm:px-3 sm:py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                ></Input>
              </div>
            </div>
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  onChange={field.onChange}
                  rulesError={errors.date_of_birth?.message}
                  value={field.value}
                ></DateSelect>
              )}
            ></Controller>
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
          <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
            <div className='flex flex-col items-center'>
              <div className='my-5'>
                <img
                  src={previewsFile || createURL(avatar)}
                  className='rounded-full border  h-28 w-28 border-gray-200 object-cover'
                  alt=''
                ></img>
              </div>
              <InputFile onChange={handleFileChange}></InputFile>
              <div className='mt-3 text-gray-400 flex flex-col'>
                <span>Dụng lượng file tối đa 1 MB</span>
                <span>Định dạng:.JPEG, .PNG</span>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
