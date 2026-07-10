import request from '../utils/request'

export const getCategoryList = () => {
  return request({
    url: '/shopping/categoryList',
    method: 'get',
  })
}
