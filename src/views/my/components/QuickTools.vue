<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/useUserStore'

// 从 Pinia 中引入状态和方法
const userStore = useUserStore()
// 从 store 中解构出快捷工具的列表数据
const { quickTools } = storeToRefs(userStore)

// 页面挂载时请求数据
onMounted(async () => {
  // 简单缓存优化：如果已经有数据了就不重复请求
  if (quickTools.value?.length === 0) {
    await userStore.fetchQuickTools()
  }
})

// 点击事件处理 (这里暂时用 emit 抛出或直接通过 vue-router 跳转)
const handleToolClick = (tool) => {
  console.log(`准备跳转到: ${tool.path}`)
  // 实际开发中：router.push(tool.path)
}
</script>

<template>
  <!-- 
    核心样式解析：
    bg-white/10: 10%透明度的白色背景
    backdrop-blur-md: 中等程度的毛玻璃/磨砂效果
    rounded-xl: 大圆角，契合小红书年轻化 UI 风格
  -->
  <div class="w-full rounded-xl bg-white/10 px-2 py-4 drop-shadow-sm backdrop-blur-md">
    <div class="flex items-center justify-around">
      <!-- 循环渲染工具项 -->
      <div
        v-for="tool in quickTools"
        :key="tool.id"
        class="flex cursor-pointer flex-col items-center justify-center transition-opacity active:opacity-70"
        @click="handleToolClick(tool)"
      >
        <!-- 1. 图标与红点角标区域 -->
        <div class="relative flex h-8 w-8 items-center justify-center">
          <!-- 阿里图库 Icon -->
          <i :class="['iconfont text-2xl text-white drop-shadow-md', tool.icon]"></i>

          <!-- 红点角标 (如果有未读消息且 badge > 0 时显示) -->
          <span
            v-if="tool.badge > 0"
            class="absolute -right-2 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full border border-[#3a3a3a] bg-red-500 px-[4px] text-[9px] font-bold text-white shadow-sm"
          >
            {{ tool.badge > 99 ? '99+' : tool.badge }}
          </span>
        </div>

        <!-- 2. 主标题 (如：创作灵感) -->
        <span class="mt-2 text-xs font-medium text-white/95">
          {{ tool.title }}
        </span>

        <!-- 3. 副标题 (如：去发现 / 128条) -->
        <span class="mt-0.5 text-[10px] text-white/60">
          {{ tool.subTitle }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 确保 iconfont 的基础样式存在 */
.iconfont {
  font-family: 'iconfont' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
