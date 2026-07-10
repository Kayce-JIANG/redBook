import { defineStore } from 'pinia'
import { ref } from 'vue'
import { myNotesApi, myProfileApi, myQuickToolsApi } from '@/api/my'

export const useUserStore = defineStore('user', () => {
  // ================= 1. State (状态) =================
  const userInfo = ref(null)
  const noteList = ref([])
  const isLoading = ref(false)
  const hasMore = ref(true)
  const quickTools = ref([]) //快捷工具列表

  // ================= 2. Actions (动作) =================
  /**
   * 1. 获取用户个人资料
   */
  const fetchUserProfile = async () => {
    try {
      const res = await myProfileApi()
      if (res.code === 200) {
        userInfo.value = res.data
      } else {
        console.error('获取用户信息失败:', res.msg)
      }
    } catch (error) {
      console.error('网络请求错误:', error)
    }
  }
  /**
   * 2. 根据Tab标签和page页码 获取笔记列表
   */
  const fetchNotesByTab = async (tabId, page = 1, isAppend = false) => {
    if (isLoading.value) return
    if (isAppend && !hasMore.value) return
    isLoading.value = true
    try {
      const res = await myNotesApi({
        tab: tabId,
        page: page,
        pageSize: 10,
      })
      if (res.code === 200) {
        const { list, hasMore: moreDataFlag } = res.data
        if (isAppend) {
          noteList.value = [...noteList.value, ...list] //追加笔记
        } else {
          noteList.value = list //替换笔记数据
        }
        hasMore.value = moreDataFlag
      }
    } catch (error) {
      console.error('获取笔记列表失败:', error)
    } finally {
      setTimeout(() => {
        isLoading.value = false
      }, 300)
    }
  }
  /**
   * 3. ：获取快捷工具配置
   */
  const fetchQuickTools = async () => {
    // 【 缓存优化】：如果数组里已经有数据了，说明请求过了，直接 return，节省服务器资源和网络开销
    if (quickTools.value.length > 0) return

    try {
      const res = await myQuickToolsApi()
      if (res.code === 200) {
        quickTools.value = res.data
      } else {
        console.error('获取快捷工具失败:', res.msg)
      }
    } catch (error) {
      console.error('获取快捷工具网络异常:', error)
      // 【 容错降级】：如果接口挂了或者断网了，硬塞一套默认配置，保证用户的页面结构不崩坏 (优雅降级)
      quickTools.value = [
        {
          id: 1,
          icon: 'icon-dengpao',
          title: '创作灵感',
          subTitle: '去发现',
          badge: 0,
          path: '/inspiration',
        },
        {
          id: 2,
          icon: 'icon-zhong',
          title: '浏览记录',
          subTitle: '暂无记录',
          badge: 0,
          path: '/history',
        },
        {
          id: 3,
          icon: 'icon--qunliaoshezhi',
          title: '群聊',
          subTitle: '发现同好',
          badge: 0,
          path: '/groups',
        },
      ]
    }
  }

  // ================= 3. 返回暴露的内容 =================
  return {
    userInfo,
    noteList,
    isLoading,
    hasMore,
    quickTools,
    fetchUserProfile,
    fetchNotesByTab,
    fetchQuickTools,
  }
})
