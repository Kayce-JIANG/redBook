<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useCartStore } from '@/stores/cart' // 引入我们之前创建的购物车 Store

const input = ref('') // 修正之前的 input2 命名错误
const cartStore = useCartStore() // 获取购物车状态

// 定义搜索事件（以后可以扩充）
const handleSearch = () => {
  console.log('正在搜索：', input.value)
}
</script>

<template>
  <!-- 使用 Tailwind 实现：固定顶部、背景白色、两端对齐、阴影、高度自适应 -->
  <header class="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-2 shadow-sm">
    <!-- 左侧：搜索栏 -->
    <div class="mr-4 flex-1">
      <el-input
        v-model="input"
        placeholder="输入商品名称..."
        :prefix-icon="Search"
        clearable
        @change="handleSearch"
        class="search-input"
      />
    </div>

    <!-- 右侧：购物车入口 -->
    <div class="relative flex cursor-pointer items-center">
      <!-- el-badge 是 Element Plus 的徽章组件，用于展示购物车数量 -->
      <el-badge
        :value="cartStore.totalCount"
        :hidden="cartStore.totalCount === 0"
        class="flex items-center"
      >
        <!-- 这里的 iconfont 类名和 icon-gouwuchekong 对应你阿里巴巴图标库的代码 -->
        <i class="iconfont icon-gouwuchekong text-2xl text-gray-700"></i>
      </el-badge>
    </div>
  </header>
</template>

<style scoped>
/* 使用深度选择器来微调 Element Plus 的圆角，使其更像小红书风格 */
:deep(.el-input__wrapper) {
  background-color: #f5f5f5; /* 浅灰色背景 */
  border-radius: 9999px; /* 椭圆圆角 */
  box-shadow: none !important;
  border: 1px solid transparent;
}

:deep(.el-input__wrapper.is-focus) {
  border-color: #ff2442; /* 聚焦时显示小红书红 */
}

/* 微调徽章样式 */
:deep(.el-badge__content) {
  background-color: #ff2442;
  border: none;
}
</style>
