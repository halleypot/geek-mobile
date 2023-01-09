import { combineReducers } from 'redux'
import homeReducer from './home'
import loginReducer from './login'
import userReducer from './user'

const rootReducer = combineReducers({
  login: loginReducer,
  profile: userReducer,
  home: homeReducer,
})

export default rootReducer
