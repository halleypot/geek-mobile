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

// channels data type
type Channel = {
  id: number //	必须		频道ID
  name: string //	必须		频道名称
}

export type UserChannel = {
  channels: Channel[]
}

export type ArticlesItem = {
  art_id: string //	必须		文章id
  title: string //	必须		文章标题
  aut_id: string //	必须		作者id
  aut_name: string //	必须		作者名称
  comm_count: string //	必须		评论数量
  pubdate: string //	必须		发布时间
  cover: {
    //	必须		封面
    type: 0 | 1 | 3 //	必须		封面类型，0-无封面，1-1张封面图片，3-3张封面
    images: string[] //	必须		封面图片
  }
}

// artile data type
export type Articles = {
  pre_timestamp: number
  results: ArticleItem[]
}

export type ArticleDetail = {
  art_id: string //	必须		文章ID
  title: string //	必须		文章标题
  pubdate: string //	必须		发布日期
  aut_id: string //	必须		作者id
  aut_name: string //	必须		作者名
  aut_photo: string //	必须		作者头像url 无图片，默认为null
  is_followed: boolean //	必须		是否关注了作者
  attitude: number //	必须		用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
  content: string //	必须		文章内容
  is_collected: boolean //	必须		是否收藏了文章
}

// search suggestion type
export type SearchOption = {
  options: string[]
}

export type SearchResults = {
  page: number
  per_page: number
  total_count: number
  results: Articles['results']
}

// axios reponse
export type LoginResponse = ApiResponse<Token>

export type UserResponse = ApiResponse<UserProfile>

export type UserDetailsResponse = ApiResponse<UserDetails>

export type UserPhotoResponse = ApiResponse<Photo>

export type UserChannelResponse = ApiResponse<UserChannel>

export type AriticlesResponse = ApiResponse<Articles>

export type ArticleDetailResponse = ApiResponse<ArticleDetail>

export type SearchOptionResponse = ApiResponse<SearchOption>

export type SearchResultsResponse = ApiResponse<SearchResults>
