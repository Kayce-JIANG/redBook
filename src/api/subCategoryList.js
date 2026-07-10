import request from '../utils/request'

export const getSubCategoryList = (params) => {
  return request({
    url: '/shopping/subCategory',
    method: 'get',
    params: params, // 关键：把 { category: 'digital' } 传给后端
  })
}
