import type { Token } from '@/types/data'
import { LoginAction } from '@/types/store'
import { getToken } from '@/utils/auth'

const initState: Token = getToken() || {
  token: '',
  refresh_token: '',
}

const loginReducer = (state = initState, actions: LoginAction): Token => {
  if (actions.type === 'login/token') {
    return actions.payload
  }
  return state
}

export default loginReducer
