// src/stores/myPageStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { myNotesApi } from '@/api/my'

export const useMyPageStore = defineStore('myPage', () => {
  // === 1. State (使用 ref 定义) ===
  const userInfo = ref(null) //用户信息
  const noteList = ref([]) //列表数据
  const page = ref(1) //页码
  const hasMore = ref(true) //是否还有更多
  const loading = ref(false) //加载状态（防止重复请求）
  const error = ref(null) //错误信息（用于UI显示）

  // === 2. Actions  ===
  const fetchPageData = async (isLoadMore = false) => {
    //防抖1：防止重复请求
    if (loading.value) {
      console.log('请求中，跳过本次请求')
      return
    }
    //防抖2：无效请求：没有更多数据但你想加载更多
    if (!hasMore.value && isLoadMore) {
      return
    }
    //防抖3:网络错误的保护
    // if(error.value){

    // }
    // 开始请求，设置状态
    loading.value = true
    error.value = null // 清除之前的错误
    //try 请求逻辑
    try {
      // 发起网络请求
      const res = await myNotesApi({
        page: page.value,
      })
      // 请求成功
      if (res.code === 200) {
        const data = res.data //解包 拿出最里面的数据
        if (!isLoadMore) {
          //分页模式1：首次加载/下拉刷新 → 替换数据
          userInfo.value = data.userInfo
          noteList.value = data.notes
        } else {
          //分页模式2：上拉加载更多 → 追加数据
          noteList.value.push(...data.notes)
        }
        // 更新分页状态
        hasMore.value = data.hasMore
        if (hasMore.value) {
          page.value++ // 只有还有更多数据时，才增加页码
        }
      } else {
        //  业务逻辑错误（如权限不足）
        error.value = res.msg || '获取数据失败'
        console.error('获取用户信息失败:', res.msg)
      }
    } catch (error) {
      // 网络请求错误
      console.error('网络请求错误:', error)
      error.value = '网络似乎出了点问题，请检查网络设置'
    } finally {
      // 必须清理加载状态
      loading.value = false
    }
  }

  // 刷新数据（下拉刷新时使用）
  const refreshData = async () => {
    page.value = 1
    hasMore.value = true
    noteList.value = [] // 立即清空列表，会有更好的用户体验
    await fetchPageData(false) // 重新加载第一页
  }
  // 重置页面状态（比如从别处切换回来需要刷新时调用）
  const resetData = () => {
    page.value = 1
    hasMore.value = true
    noteList.value = []
    userInfo.value = null
  }

  // === 3. 必须 return 暴露出去 ===
  return {
    userInfo,
    noteList,
    page,
    hasMore,
    loading,
    fetchPageData,
    resetData,
    error,
    refreshData,
  }
})
