import store from '@/store'
import { ThunkAction } from 'redux-thunk'
import { EditUserDetails, Photo, Token, UserDetails, UserProfile } from './data'

export type RootState = ReturnType<typeof store.getState>

type RootAction = LoginAction | getUserAction

export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>

export type LoginAction =
  | {
      type: 'login/token'
      payload: Token
    }
  | {
      type: 'login/logout'
    }

export type getUserAction =
  | {
      type: 'profile/get'
      paylaod: UserProfile
    }
  | {
      type: 'profile/edit'
      paylaod: UserDetails
    }
  | {
      type: 'profile/update'
      payload: EditUserDetails
    }
  | {
      type: 'profile/updatePhoto'
      payload: string
    }
