import { useState } from 'react'
import InputNumber, { InputNumberProps } from '../componetNumber'

interface QualityControlerProps extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
  onFocused?: (value: number) => void
}

export default function QualityControler({
  max,
  onIncrease,
  onDecrease,
  classNameWrapper = 'ml-10',
  value,
  onType,
  onFocused,
  ...rest
}: QualityControlerProps) {
  const [valueLocal, setValueLocal] = useState<number>(Number(value) || 0)
  const handleChnge = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
    setValueLocal(_value)
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocused && onFocused(Number(e.target.value))
  }
  const increase = () => {
    let _value = Number(value || valueLocal) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setValueLocal(_value)
  }
  const decrease = () => {
    let _value = Number(value || valueLocal) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
    setValueLocal(_value)
  }
  return (
    <div className={'flex items-center ' + classNameWrapper}>
      <button
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        onClick={decrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
        </svg>
      </button>
      <InputNumber
        onChange={handleChnge}
        value={value || valueLocal}
        type='text'
        className=' '
        classNameError='hidden'
        classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
        {...rest}
        onBlur={handleBlur}
      ></InputNumber>
      <button
        className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
        onClick={increase}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
