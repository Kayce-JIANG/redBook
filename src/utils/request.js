//引入
import axios from 'axios'
import router from '@/router'
//创建service实例
const service = axios.create({
  baseURL: 'https://m1.apifoxmock.com/m1/7803650-7550608-default',
  timeout: 10000,
})
// request请求拦截器--Token 注入
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
//创建response响应拦截器--错误处理
service.interceptors.response.use(
  (response) => {
    return response.data //数据脱壳
  },
  (error) => {
    // 基础错误处理
    if (error.response?.status === 401) {
      localStorage.removeItem('token') // 清除本地 token
      router.push('/login') // 跳转到登录页
    }
    // 统一错误格式
    return Promise.reject({
      code: error.response?.status || 500,
      message: error.response?.data?.message || '网络错误',
      data: error.response?.data,
    })
  },
)
//暴露出去
export default service
