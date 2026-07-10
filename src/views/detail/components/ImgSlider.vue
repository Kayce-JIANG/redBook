<script setup>
import { ref } from 'vue'

// 1. 定义接收父组件传来的图片数组
const props = defineProps({
  images: {
    type: Array,
    default: () => [], // 默认为空数组
  },
})

// 2. 记录当前滑动到了第几张图 (用于底部小圆点高亮)
const currentIndex = ref(0)

// 3. 监听滚动事件，计算当前激活的图片索引
const handleScroll = (e) => {
  const container = e.target
  const scrollLeft = container.scrollLeft // 容器的滚动距离
  const width = container.clientWidth // 容器的实际宽度 (即单张图片的宽度)
  currentIndex.value = Math.round(scrollLeft / width) // Math.round 四舍五入，当滑动超过一半时，索引发生变化
}
</script>

<template>
  <!-- 容器：相对定位，设置宽高比为 3:4 (小红书标准比例) -->
  <div class="relative aspect-[3/4] w-full bg-gray-50">
    <!-- 状态 1：没有图片时的占位符 -->
    <div
      v-if="!images || images.length === 0"
      class="flex h-full items-center justify-center text-gray-400"
    >
      <i class="iconfont icon-tupian mb-2 text-4xl"></i>
      <span class="text-sm">暂无图片</span>
    </div>

    <!-- 状态 2：图片滑动区域 -->
    <div
      v-else
      class="scrollbar-hide flex h-full w-full snap-x snap-mandatory overflow-x-auto"
      @scroll="handleScroll"
    >
      <!-- 每张图片占满一屏 (w-full shrink-0 snap-center) -->
      <div
        v-for="(img, index) in images"
        :key="index"
        class="relative h-full w-full shrink-0 snap-center"
      >
        <img :src="img" class="absolute left-0 top-0 h-full w-full object-cover" alt="笔记图片" />
      </div>
    </div>

    <!-- 状态 3：底部小圆点 (只有图片大于1张时才显示) -->
    <div
      v-if="images?.length > 1"
      class="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/20 px-2 py-1 backdrop-blur-sm"
    >
      <span
        v-for="(_, index) in images"
        :key="index"
        class="h-1.5 rounded-full transition-all duration-300"
        :class="
          currentIndex === index
            ? 'w-3 bg-[#ff2442]' // 当前激活态：变宽且变成小红书红
            : 'w-1.5 bg-white/70' // 未激活态：小白点
        "
      ></span>
    </div>
  </div>
</template>

<style scoped>
/* 隐藏移动端的原生滚动条，让滑动看起来像 App 一样干净 */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
