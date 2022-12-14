import axios from 'axios'
import store from '@/store'
import { Toast } from 'antd-mobile'
import { customHistory } from './history'
import { clearToken, isAuth, setToken } from './auth'
import type { LoginResponse, Token } from '@/types/data'

const http = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  // baseURL: process.env.REACT_APP_URL
})

// 请求拦截器
http.interceptors.request.use((config) => {
  // 获取token
  const {
    login: { token },
  } = store.getState()

  // 除了登录请求外，其他请求统一添加 token
  if (!config.url?.startsWith('/authorizations')) {
    // ts中！操作符叫非空断言=》去掉null undefined 告诉ts类型是安全的
    config.headers!.Authorization = `Bearer ${token}`
  }

  return config
})

// 响应拦截器
http.interceptors.response.use(
  (res) => {
    // 简化返回数据
    return res.data
  },
  async (error) => {
    // 处理token过期/统一处理接口请求错误
    try {
      if (!error.response) {
        Toast.show({
          icon: 'fail',
          content: 'connection is busy. please try later',
          duration: 1000,
        })
        throw new Error(error)
      }

      // if 401, use use refresh_token
      if (error.response.status === 401) {
        // Toast.show({
        //   icon: 'warning',
        //   duration: 1000,
        //   content: 'invalid authorization, please login again',
        //   afterClose: () =>
        //     customHistory.push('/login', {
        //       from: customHistory.location.pathname,
        //     }),
        // })

        // if no token, then switch into login page
        if (!isAuth) {
          Toast.show({
            content: 'invalid ahtorization, please login',
            afterClose: () => {
              customHistory.push('/login', {
                from: customHistory.location.pathname,
              })
            },
          })
          // if has token , then send refresh token
        } else {
          const { refresh_token } = store.getState().login
          const res: LoginResponse = await http.put('/authorizations', null, {
            headers: {
              Authorization: `Bearer ${refresh_token}`,
            },
          })
          const tokens: Token = {
            token: res.data.token,
            refresh_token,
          }
          // store new token in local storage
          setToken(tokens)
          // store tokens in redux
          store.dispatch({ type: 'login/token', payload: tokens })

          return http(error.config)
        }
      }
    } catch (e) {
      // if problem in refresh token, then refresh_token has expired too. users must login
      // dispatch logout action
      // clear token in local storage and redux
      clearToken()
      store.dispatch({ type: 'login/logout' })

      Toast.show({
        content: 'athorization expired, please login',
        afterClose: () =>
          customHistory.replace('/login', {
            from: customHistory.location.pathname,
          }),
      })
      return Promise.reject(e)
    }

    return Promise.reject(error)
  }
)

export default http
