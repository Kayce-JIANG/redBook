<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia' // 关键：引入 storeToRefs
import { useNoticeStore } from '@/stores/useNoticeStore'

import NoticeHeader from './components/NoticeHeader.vue'
import NoticeEntry from './components/NoticeEntry.vue'
import NoticeList from './components/NoticeList.vue'

// 1. 实例化 Store
const noticeStore = useNoticeStore()
// 2. 从 Store 中解构出 messageList 使得在模板中可以直接使用
const { messageList } = storeToRefs(noticeStore)

onMounted(() => {
  console.log('组件挂载了，准备获取数据')
  noticeStore.initNoticeData() // 直接调用pinia store的统一初始化方法（同时触发两个请求：一个拿上方状态，一个拿下方列表）
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white">
    <!-- 顶部导航栏 -->
    <NoticeHeader />

    <!-- 功能入口  -->
    <NoticeEntry />

    <!-- 消息列表  -->
    <div class="flex-1 overflow-y-auto">
      <NoticeList :list="messageList" />
    </div>
  </div>
</template>
