import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { scheme, schemeType } from '~/utils/validateForm'
import useConfigQuery from './useConfigQuery'
// import { omit } from 'lodash'
// cú pháp để tree-tracking
import omit from 'lodash/omit'
import { path } from '~/constant/app.path'
import { createSearchParams, useNavigate } from 'react-router-dom'

type formState = Pick<schemeType, 'name'>
const nameScheme = scheme.pick(['name'])
export default function useSearchProduct() {
  const navigate = useNavigate()
  const queryConfig = useConfigQuery()
  const { register, handleSubmit } = useForm<formState>({
    defaultValues: { name: '' },
    resolver: yupResolver(nameScheme)
  })
  // handle search
  const handleSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit({ ...queryConfig, name: data.name }, ['order', 'sort_by'])
      : omit({ ...queryConfig, name: data.name }, ['order'])
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return { register, handleSearch }
}
