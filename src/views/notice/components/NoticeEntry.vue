<script setup>
import { computed } from 'vue'
import { useNoticeStore } from '@/stores/useNoticeStore'

const noticeStore = useNoticeStore()

/**
 * 这里的menuItems 采用了组合模式：
 * 静态的 UI 配置（图标、颜色）+ 动态的数据（来自 Pinia 的未读数）
 */
const menuItems = computed(() => [
  {
    id: 'likes',
    title: '赞和收藏',
    icon: 'icon-aixin1', // 替换为你真实的 iconfont 类名
    bgColor: 'bg-red-50', // 浅红色背景
    textColor: 'text-red-500', // 图标颜色
    count: noticeStore.unreadStats.likes, // 从 Store 获取动态数据
  },
  {
    id: 'follows',
    title: '新增关注',
    icon: 'icon-wodedefuben', // 替换为你真实的 iconfont 类名
    bgColor: 'bg-blue-50', // 浅蓝色背景
    textColor: 'text-blue-500',
    count: noticeStore.unreadStats.follows,
  },
  {
    id: 'comments',
    title: '评论和@',
    icon: 'icon-pinglun', // 替换为你真实的 iconfont 类名
    bgColor: 'bg-green-50', // 浅绿色背景
    textColor: 'text-green-500',
    count: noticeStore.unreadStats.comments,
  },
])
</script>
<template>
  <div class="flex justify-around border-b border-gray-50 py-6">
    <!-- 循环渲染三个入口 -->
    <div v-for="item in menuItems" :key="item.id" class="relative flex flex-col items-center">
      <!-- 圆圈图标背景 -->
      <div
        :class="[
          item.bgColor,
          'relative mb-2 flex h-12 w-12 items-center justify-center rounded-2xl',
        ]"
      >
        <i :class="['iconfont text-2xl', item.icon, item.textColor]"></i>

        <!-- 只要 Store 里的 count 大于 0，我就显示出来 -->
        <div
          v-if="item.count > 0"
          class="absolute -right-1 -top-1 rounded-full border-2 border-white bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white"
        >
          {{ item.count > 99 ? '99+' : item.count }}
        </div>
      </div>

      <span class="text-xs text-gray-600">{{ item.title }}</span>
    </div>
  </div>
</template>

<style scoped>
/* 如果你的 iconfont 需要微调位置 */
.iconfont {
  display: inline-block;
  line-height: 1;
}
</style>
