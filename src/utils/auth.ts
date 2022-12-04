import { Token } from '@/types/data'

const GEEK_TOKEN = 'geek-token'

export const setToken = (token: Token): void => {
  localStorage.setItem(GEEK_TOKEN, JSON.stringify(token))
}

export const getToken = () => {
  return JSON.parse(localStorage.getItem(GEEK_TOKEN) ?? '{}') as Token
}

export const clearToken = (): void => {
  localStorage.removeItem(GEEK_TOKEN)
}

// 判断是否登录
export const isAuth = !!getToken().token
