<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/useUserStore'

import MyNavBar from './components/MyNavBar.vue'
import ProfileHeader from './components/ProfileHeader.vue'
import QuickTools from './components/QuickTools.vue'
import ContentTabs from './components/ContentTabs.vue'
import NoteWaterfall from './components/NoteWaterfall.vue'

// 1. 状态管理 (Pinia)
const userStore = useUserStore()
const { userInfo, noteList, isLoading, hasMore } = storeToRefs(userStore)

// 2. 本地状态
const currentTab = ref('notes')
const currentPage = ref(1)

// 3. 方法
/**
 * 处理标签变换
 */
const handleTabChange = async (tabId) => {
  if (currentTab.value === tabId) return
  currentTab.value = tabId
  currentPage.value = 1
  noteList.value = [] // 清空旧数据
  await userStore.fetchNotesByTab(tabId, currentPage.value)
}

/**
 * 瀑布流触底加载更多
 */
const handleLoadMore = async () => {
  if (isLoading.value || !hasMore.value) return
  currentPage.value += 1
  await userStore.fetchNotesByTab(currentTab.value, currentPage.value, true)
}

// 4. 生命周期
onMounted(async () => {
  await userStore.fetchUserProfile()
  await userStore.fetchNotesByTab(currentTab.value, currentPage.value)
})
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f5] pb-[60px]">
    <!-- ================= 上半部分 ================= -->
    <div class="relative w-full bg-[#3a3a3a] pb-8 pt-12 text-white">
      <div class="absolute inset-0 z-0 overflow-hidden">
        <div
          class="h-full w-full bg-[#3a3a3a] bg-cover bg-center bg-no-repeat opacity-60 transition-all duration-300"
          :style="{ backgroundImage: userInfo?.bgUrl ? `url(${userInfo.bgUrl})` : 'none' }"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-[#3a3a3a]"
        ></div>
      </div>

      <div class="relative z-10 px-4">
        <MyNavBar />
        <!-- 【修复点】：加上 v-if="userInfo" 防 Null 报错 -->
        <ProfileHeader v-if="userInfo" :user="userInfo" class="mt-4" />
        <QuickTools class="mt-6" />
      </div>
    </div>

    <!-- ================= 下半部分 ================= -->
    <div class="relative z-20 -mt-3 min-h-screen rounded-t-xl bg-[#f9f9f9]">
      <div class="sticky top-0 z-30 rounded-t-xl bg-[#f9f9f9] px-2 pt-3">
        <ContentTabs :active-tab="currentTab" @change="handleTabChange" />
      </div>

      <div class="px-2 pb-6 pt-3">
        <div
          v-if="isLoading && noteList.length === 0"
          class="py-10 text-center text-sm text-gray-400"
        >
          加载中...
        </div>

        <NoteWaterfall
          v-if="noteList.length > 0"
          :notes="noteList"
          :loading="isLoading"
          :hasMore="hasMore"
          @setupObserver="handleLoadMore"
        />
        <div v-if="!hasMore && noteList.length > 0" class="py-4 text-center text-xs text-gray-400">
          - 已经到底啦 -
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
