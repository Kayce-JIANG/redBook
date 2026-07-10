import request from '../utils/request'
// 获取用户信息接口的api
export const myProfileApi = () => {
  return request({
    url: '/user/profile',
    method: 'get',
  })
}

// 获取笔记列表接口 (根据 Tab 和页码获取)的api
export const myNotesApi = (params) => {
  return request({
    url: '/user/notes',
    method: 'get',
    params,
  })
}

// 获取用户主页快捷工具列表
export const myQuickToolsApi = (params) => {
  return request({
    url: '/user/quick-tools',
    method: 'get',
    params,
  })
}
//获取登录页token
export const myLoginApi = (params) => {
  return request({
    url: '/user/login',
    method: 'get',
    params,
  })
}
