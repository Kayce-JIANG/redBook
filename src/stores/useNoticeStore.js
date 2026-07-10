import { defineStore } from 'pinia'
import { unreadApi, getNoticeListApi } from '@/api/notice'

// 辅助函数：专门用来从乱七八糟的返回结构中寻找数组 (解耦逻辑)
const ensureArray = (res) => {
  if (Array.isArray(res)) return res
  if (Array.isArray(res?.data)) return res.data
  if (Array.isArray(res?.data?.data)) return res.data.data
  return []
}

export const useNoticeStore = defineStore('notice', {
  state: () => ({
    unreadStats: { likes: 0, follows: 0, comments: 0 },
    messageList: [],
    loading: false,
    error: null, // 错误状态记录
  }),

  actions: {
    /**
     * 优化点 1：统一初始化/加载方法
     * 场景：页面一进来要发两个请求，用 Promise.allSettled 同时发，速度更快
     */
    async initNoticeData() {
      this.loading = true
      this.error = null
      // 使用 allSettled 保证即使其中一个接口挂了，另一个也能正常渲染
      await Promise.allSettled([this.fetchUnreadStatus(), this.fetchMessageList()])
      this.loading = false
    },

    // 获取未读数
    async fetchUnreadStatus() {
      try {
        // 优化点 2：这里的 user_id 以后应该从 userStore 动态获取，而不是写死
        const res = await unreadApi({ user_id: '123', status: 'active' })
        if (res?.code === 200) {
          this.unreadStats = res.data
        }
      } catch (err) {
        console.error('未读数获取失败:', err)
      }
    },

    // 获取消息列表
    async fetchMessageList() {
      try {
        const res = await getNoticeListApi()
        const list = ensureArray(res)
        if (list.length === 0 && !Array.isArray(res)) {
          console.warn('API 返回结构异常，未找到列表数据')
        }
        this.messageList = list
      } catch (err) {
        this.error = '获取消息列表失败'
        console.error(err)
      }
    },
  },
})
