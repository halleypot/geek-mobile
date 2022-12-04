import store from '@/store'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import { customHistory } from './history'

const http = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  timeout: 5000,
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    const {
      login: { token },
    } = store.getState()

    // 除了登录请求外，其他请求统一添加 token
    if (!config.url?.startsWith('/authorizations')) {
      // 此处，需要使用 非空断言 来去掉 headers 类型中的 undefined 类型
      config.headers!.Authorization = `Bearer ${token}`
    }

    return config
  },
  (err) => {
    return Promise.reject(err || 'failed to login')
  }
)

// 响应拦截器
http.interceptors.response.use(null, (error) => {
  // 响应失败时，会执行此处的回调函数
  if (!error.response) {
    // 网路超时
    Toast.show({
      content: '网络繁忙，请稍后再试',
      duration: 1000,
    })
    return Promise.reject(error)
  }

  if (error.response.status === 401) {
    // token 过期，登录超时
    Toast.show({
      content: '登录超时，请重新登录',
      duration: 1000,
      afterClose: () => {
        customHistory.push('/login', {
          from: customHistory.location.pathname,
        })
        // 触发退出 action，将 token 等清除
        // store.dispatch(logout())
      },
    })
  }

  return error
})

export default http
