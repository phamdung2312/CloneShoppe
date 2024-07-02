import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { schemeForm } from '~/utils/validateForm'
import useConfigQuery from './useConfigQuery'
// import { omit } from 'lodash'
// cú pháp để tree-tracking
import omit from 'lodash/omit'
import { path } from '~/constant/app.path'
import { createSearchParams, useNavigate } from 'react-router-dom'

export type formStateSearch = Pick<schemeForm, 'form_nam1' | 'form_nam2'>
const nameScheme = schemeForm.pick(['form_nam1', 'form_nam2'])
export default function useSearchProduct() {
  const navigate = useNavigate()
  const queryConfig = useConfigQuery()
  const { register, handleSubmit } = useForm<formStateSearch>({
    defaultValues: { form_nam1: '', form_nam2: '' },
    resolver: yupResolver(nameScheme)
  })

  // handle search
  const handleSearch = handleSubmit((data) => {
    console.log('hello')
    // const formDataKey = type === 'form1' ? 'form_nam1' : 'form_nam2'
    const searchValue = data
    console.log('searchValue', searchValue)
    console.log('data', data)
    const config = queryConfig.order
      ? omit({ ...queryConfig, name: data.form_nam1 || data.form_nam2 }, ['order', 'sort_by'])
      : omit({ ...queryConfig, name: data.form_nam1 || data.form_nam2 }, ['order'])
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })

  return { register, handleSearch }
}
