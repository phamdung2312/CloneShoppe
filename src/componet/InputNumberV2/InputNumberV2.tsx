import { InputHTMLAttributes, useState } from 'react'
import { UseControllerProps, useController } from 'react-hook-form'
import { NoUnderfinedField } from '~/types/utils.type'
import { schemeType } from '~/utils/validateForm'

type FormInputNumber = NoUnderfinedField<Pick<schemeType, 'min_price' | 'max_price'>>
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InputNumberV2(props: UseControllerProps<FormInputNumber> & InputNumberProps) {
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState(field.value)
  const {
    value = '',
    type,
    onChange,
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'text-red-600 min-h-[1.25rem] text-sm',
    ...rest
  } = props
  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formValueInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(formValueInput) || formValueInput === '')
    // nếu là số và text rỗng thì được onChange (Nhập)
    if (numberCondition || type !== 'number') {
      // cập nhật setLocalValue state
      setLocalValue(formValueInput)
      // gọi onchange bằng file.onchange để cập nhật vào state React Hook Form
      field.onChange(event)
      // thực thi onChange callback từ ngoài truyền vào props
      onChange && onChange(event)
    }
  }
  return (
    <div className={className}>
      <input {...rest} className={classNameInput} {...field} value={value || localValue} onChange={handleOnchange} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputNumberV2
