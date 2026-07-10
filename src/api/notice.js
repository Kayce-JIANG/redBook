import request from '@/utils/request'

export const unreadApi = () => {
  return request({
    url: '/notice/unread',
    method: 'get',
  })
}
/**
 * 获取消息通知列表
 * @param {Object} params - GET请求参数 (例如: { page: 1, limit: 10 })
 */
export const getNoticeListApi = (params) => {
  return request({
    url: '/notice/list', // 对应你在 Apifox 里填写的路径
    method: 'get',
    params: params, // GET 请求必须用 params 传参
  })
}

/**
 * 清除未读数 (将某个会话标记为已读)
 * @param {Object} data - POST请求参数 (例如: { id: 1 })
 */
export const clearUnreadApi = (data) => {
  return request({
    url: '/notice/read',
    method: 'post',
    data: data,
  })
}

/**
 * 设置免打扰状态
 * @param {Object} data - POST请求参数 (例如: { id: 1, isMuted: true })
 */
export const setMuteStatusApi = (data) => {
  return request({
    url: '/notice/mute',
    method: 'post',
    data: data,
  })
}
