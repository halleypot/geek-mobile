import store from '@/store'
import { ThunkAction } from 'redux-thunk'
import {
  Channel,
  EditUserDetails,
  Photo,
  Token,
  UserDetails,
  UserProfile,
} from './data'

export type RootState = ReturnType<typeof store.getState>

type RootAction = LoginAction | getUserAction | homeAction

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

export type homeAction =
  | {
      type: 'home/getUserChannels'
      payload: Channel[]
    }
  | {
      type: 'home/getRestChannels'
      payload: Channel[]
    }
  | {
      type: 'home/changeTab'
      payload: string
    }
  | {
      type: 'home/delChannel'
      payload: Channel
    }
  | {
      type: 'home/addChannel'
      payload: Channel
    }
