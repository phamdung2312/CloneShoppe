import { InputHTMLAttributes, forwardRef, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  rulesError?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    className,
    rulesError,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'text-red-600 min-h-[1.25rem] text-sm',
    onChange,
    value = '',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState(value)
  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    // nếu là số và text rỗng thì được onChange (Nhập)
    if (/^\d+$/.test(value) || value === '') {
      // thực thi onChange callback từ ngoài truyền vào props
      onChange && onChange(event)
      // cập nhật setLocalValue state
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input
        {...rest}
        className={classNameInput}
        value={value === undefined ? localValue : value}
        onChange={handleOnchange}
        ref={ref}
      />
      <div className={classNameError}>{rulesError}</div>
    </div>
  )
})

export default InputNumber
