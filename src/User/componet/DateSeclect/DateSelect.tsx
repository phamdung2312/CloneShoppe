// import { range } from 'lodash'
// cú pháp để tree-tracking
import range from 'lodash/range'

import { useEffect, useState } from 'react'

interface dateSelectProps {
  onChange?: (value: Date) => void
  value?: Date
  rulesError?: string
}

export default function DateSelect({ onChange, value, rulesError }: dateSelectProps) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({ date: value?.getDate(), month: value?.getMonth(), year: value?.getFullYear() })
    }
  }, [value])
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value: valueDate } = e.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueDate)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='flex flex-wrap items-center mt-4'>
      <div className='sm:w-[20%] w-full truncate sm:text-right capitalize  mb-4'>Ngày sinh</div>
      <div className='w-[80%] sm:pl-5'>
        <div className='flex justify-between sm:px-[12px]'>
          <select
            value={value?.getDate() || date.date}
            name='date'
            onChange={handleChange}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orangeHeaderTop'
          >
            <option disabled value=''>
              Ngày
            </option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={value?.getMonth() || date.month}
            name='month'
            onChange={handleChange}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orangeHeaderTop'
          >
            <option disabled value=''>
              Tháng
            </option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            value={value?.getFullYear() || date.year}
            name='year'
            onChange={handleChange}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orangeHeaderTop'
          >
            <option disabled value=''>
              Năm
            </option>
            {range(1990, 2025).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='text-red-600 min-h-[1.25rem] text-sm pl-[12px]'>{rulesError}</div>
      </div>
    </div>
  )
}
