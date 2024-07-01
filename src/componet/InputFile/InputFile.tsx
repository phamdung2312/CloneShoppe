import { useRef } from 'react'
import { toast } from 'react-toastify'
import { Fragment } from 'react/jsx-runtime'
import { config } from '~/utils/config'

interface InputFileProps {
  onChange: (file?: File) => void
}
export default function InputFile({ onChange }: InputFileProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnchangeChoooseAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0]
    if (fileFromLocal && fileFromLocal.size >= config.maxAvatarSize && fileFromLocal.type.includes('image')) {
      toast.error('file không đúng định dạng, file phải dưới 1MB', {
        position: 'top-center',
        autoClose: 1000
      })
    } else {
      onChange && onChange(fileFromLocal)
      // setFile(fileFromLocal)
    }
  }
  const handleClickChoooseAvatar = () => {
    inputRef.current?.click()
  }
  return (
    <Fragment>
      <input
        onClick={(event) => ((event.target as HTMLInputElement).value = '')}
        className='hidden '
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={inputRef}
        onChange={(e) => handleOnchangeChoooseAvatar(e)}
      />
      <button
        onClick={handleClickChoooseAvatar}
        type='button'
        className='flex h-10 items-center px-6 rounded-sm border capitalize mt-2 bg-white justify-center border-gray-200 shadow-sm'
      >
        Chọn ảnh
      </button>
    </Fragment>
  )
}
