<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['click-menu', 'click-scan', 'click-share'])

// 交互事件
const handleMenu = () => emit('click-menu')
const handleScan = () => emit('click-scan')
const handleShare = () => emit('click-share')

// ================= 滚动吸顶逻辑 =================
const isScrolled = ref(false)

// [优化点5] 滚动性能优化：引入 requestAnimationFrame 防止高频重绘引发的卡顿
let ticking = false
const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      isScrolled.value = window.scrollY > 20
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- 
    1. absolute 定位在父容器顶部
    2. pt-12 是为了避开手机的状态栏 (刘海屏、灵动岛等)
    3. z-[100] 确保层级最高，不会被背景遮挡
  -->
  <div
    :class="[
      'fixed left-0 top-0 z-[100] flex w-full items-center justify-between px-4 pb-2 pt-12 transition-all duration-300',
      isScrolled
        ? 'bg-[#3a3a3a]/95 shadow-sm backdrop-blur-md' // 往下滚时：深色半透明毛玻璃背景 + 微小阴影
        : 'bg-transparent drop-shadow-md', // 在顶部时：全透明背景 + 图标自带阴影防吞噬
    ]"
  >
    <!-- 左侧：菜单 (三横) -->
    <div class="flex h-8 w-8 cursor-pointer items-center justify-center" @click="handleMenu">
      <i class="iconfont icon-caidan_o text-2xl drop-shadow-md"></i>
    </div>

    <!-- 右侧：扫一扫 + 分享 -->
    <div class="flex items-center space-x-4">
      <!-- 扫一扫 -->
      <div class="flex h-8 w-8 cursor-pointer items-center justify-center" @click="handleScan">
        <i class="iconfont icon-saoyisao text-2xl drop-shadow-md"></i>
      </div>
      <!-- 分享 -->
      <div class="flex h-8 w-8 cursor-pointer items-center justify-center" @click="handleShare">
        <i class="iconfont icon-zhuanfa text-2xl drop-shadow-md"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.iconfont {
  font-size: 24px;
}
</style>
