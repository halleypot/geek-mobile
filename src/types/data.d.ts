import { StringDecoder } from 'string_decoder'

export type Token = {
  token: string
  refresh_token: string
}

export type LoginState = {
  mobile: string
  code: string
}

export type UserProfile = {
  id: string //	必须		用户id
  name: string //必须		用户名
  photo: string //	必须		用户头像
  intro?: string //	必须		简介
  art_count: number //	必须		发布文章数
  follow_count: number //	必须		关注的数目
  fans_count: number //	必须		fans_count
  like_count: number //	必须		被点赞数
}

export type UserDetails = {
  id: string //	必须		用户id
  photo: string //	必须		头像
  mobile: string //	必须		手机号
  intro?: string
  gender: number | string //	必须		性别，0-男，1-女
  name: string //	必须		用户名
  birthday: string //	必须		生日，格式 '2018-12-20'
  mode?: 'nickname' | 'self-introduction' | 'gender' | 'photo' | 'birthday'
}

type Photo = {
  id: string //	必须		用户id
  photo: string //	必须		头像url地址
}

export type EditUserDetails = Partial<UserDetails>

type ApiResponse<G> = {
  message: String
  data: G
}

export type LoginResponse = ApiResponse<Token>

export type UserResponse = ApiResponse<UserProfile>

export type UserDetailsResponse = ApiResponse<UserDetails>

export type UserPhotoResponse = ApiResponse<Photo>
