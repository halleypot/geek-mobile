import { RootThunkAction } from '@/types/store'
import http from '@/utils/request'
import {
  UserResponse,
  UserDetailsResponse,
  EditUserDetails,
  UserPhotoResponse,
} from '@/types/data'

export const getUserProfile = (): RootThunkAction => {
  return async (dispatch) => {
    const res: UserResponse = await http.get('/user')

    dispatch({
      type: 'profile/get',
      paylaod: res.data,
    })
  }
}

export const getUserDetails = (): RootThunkAction => {
  return async (dispatch) => {
    const res: UserDetailsResponse = await http.get('/user/profile')

    dispatch({
      type: 'profile/edit',
      paylaod: res.data,
    })
  }
}

export const editUserDetails = (
  userProfile: EditUserDetails
): RootThunkAction => {
  return async (dispatch) => {
    await http.patch('user/profile', { userProfile })
    dispatch({ type: 'profile/update', payload: userProfile })
  }
}

export const editUserPhoto = (photo: FormData): RootThunkAction => {
  return async (dispatch) => {
    const res: UserPhotoResponse = await http({
      method: 'PATCH',
      url: '/user/photo',
      data: photo,
    })
    console.log(res)
    dispatch({ type: 'profile/updatePhoto', payload: res.data.photo })
  }
}
