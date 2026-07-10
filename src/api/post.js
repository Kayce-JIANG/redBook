import request from '../utils/request'

export const getPostList = (category) => {
  return request({
    url: '/posts',
    method: 'get',
    params: {
      type: category,
    },
  })
}

export const getDetailComment = (id) => {
  return request({
    url: '/post/comment',
    method: 'get',
    params: {
      id: id,
    },
  })
}

export const getDetailNotecontent = (id) => {
  return request({
    url: '/post/notecontent',
    method: 'get',
    params: {
      id: id,
    },
  })
}

// 切换点赞状态的 API
export const toggleLikeApi = (data) => {
  return request({
    url: '/post/like',
    method: 'post',
    data: data, // 包含 { note_id, status }
  })
}
// 切换收藏状态的 API
export const toggleFavApi = (data) => {
  return request({
    url: '/post/fav',
    method: 'post',
    data: data, // 包含 { note_id, status }
  })
}
