<script setup>
import ProductCard from './ProductCard.vue'

// 1. 接收父组件传来的 list 数据
// 这里的 props 就像是大管家发下来的“工资”
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="grid grid-cols-2 gap-2 p-2">
    <!-- 2. 直接遍历 props 里的 list，不需要自己发请求了 -->
    <div v-for="item in list" :key="item.id">
      <ProductCard :data="item" />
    </div>
  </div>
</template>
