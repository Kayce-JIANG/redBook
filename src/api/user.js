import request from '../utils/request'
// 切换关注状态的 API
export const toggleFollowApi = (data) => {
  return request({
    url: '/user/follow',
    method: 'post',
    data: data, // 包含 user_id 和 status
  })
}
