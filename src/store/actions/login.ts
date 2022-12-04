import { RootThunkAction } from '@/types/store'
import http from '@/utils/request'
import type { LoginState } from '@/types/data'
import { setToken } from '@/utils/auth'

const loginAction = (payload: LoginState): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.post('/authorizations', payload)
    console.log(res.data)
    dispatch({ type: 'login/token', payload: res.data })
    // store token in local storage
    setToken(res.data)
  }
}

export { loginAction }
