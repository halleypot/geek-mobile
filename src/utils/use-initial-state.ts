import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/types/store'

const useInitialState = <StateName extends keyof RootState>(
  actionName: () => void,
  stateName: StateName
) => {
  const dispatch = useDispatch()
  // get user's profile
  const initialState = useSelector((state: RootState) => state[stateName])

  // get user's profile
  useEffect(() => {
    dispatch<any>(actionName())
  }, [dispatch, actionName])

  return initialState
}

export default useInitialState
