import { LoginAction, RootThunkAction } from '@/types/store'
import http from '@/utils/request'
import type { LoginState } from '@/types/data'
import { clearToken, setToken } from '@/utils/auth'
import type { LoginResponse } from '@/types/data'

const loginAction = (payload: LoginState): RootThunkAction => {
  return async (dispatch) => {
    const res: LoginResponse = await http.post('/authorizations', payload)
    console.log(res.data)
    dispatch({ type: 'login/token', payload: res.data })
    // store token in local storage
    setToken(res.data)
  }
}

const logoutAction = (): LoginAction => {
  // clear local storage of token
  clearToken()
  return { type: 'login/logout' }
}

export { loginAction, logoutAction }
