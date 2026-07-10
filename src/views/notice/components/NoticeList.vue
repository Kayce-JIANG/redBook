<script setup>
import NoticeItem from './NoticeItem.vue'

// 接收父组件传递的消息数组
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
</script>
<template>
  <div class="pb-safe w-full bg-white">
    <!-- 空状态提示 -->
    <div
      v-if="!list || list.length === 0"
      class="flex flex-col items-center justify-center pb-10 pt-20"
    >
      <i class="iconfont icon-zhuangtai_kongzhuangtai mb-4 text-6xl text-gray-200"></i>
      <span class="text-sm text-gray-400">暂无消息哦~</span>
    </div>
    <!-- 消息列表 -->
    <div v-else class="flex flex-col">
      <NoticeItem v-for="(msg, index) in list" :key="msg.id" :item="msg" />
    </div>
  </div>
</template>

<style scoped>
/* 适配 iOS 底部安全距离 */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
