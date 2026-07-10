import request from '../utils/request'

export const getProductCard = (params) => {
  return request({
    url: '/shopping/productCard',
    method: 'get',
    params: params,
  })
}
