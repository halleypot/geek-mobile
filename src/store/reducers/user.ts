import type { UserDetails, UserProfile } from '@/types/data'
import { getUserAction } from '@/types/store'

type ProfileState = {
  user: UserProfile
  userDetails: UserDetails
}

const profileState = {
  user: {},
  userDetails: {},
} as ProfileState

const userReducer = (state = profileState, actions: getUserAction) => {
  if (actions.type === 'profile/get') {
    return {
      ...state,
      user: actions.paylaod,
    }
  }

  if (actions.type === 'profile/edit') {
    return {
      ...state,
      userDetails: actions.paylaod,
    }
  }

  if (actions.type === 'profile/update') {
    return {
      ...state,
      userDetails: {
        ...state.userDetails,
        ...actions.payload,
      },
    }
  }

  if (actions.type === 'profile/updatePhoto') {
    return {
      ...state,
      userDetails: {
        ...state.userDetails,
        photo: actions.payload,
      },
    }
  }

  return state
}

export default userReducer
