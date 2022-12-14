import { combineReducers } from 'redux'
import loginReducer from './login'
import userReducer from './user'

const rootReducer = combineReducers({
  login: loginReducer,
  profile: userReducer,
})

export default rootReducer
