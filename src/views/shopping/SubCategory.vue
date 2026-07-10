<script setup>
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <!-- 外层容器 -->
  <div class="grid grid-cols-5 gap-y-4 bg-white p-4">
    <div
      v-for="item in list"
      :key="item.id"
      class="flex cursor-pointer flex-col items-center justify-center"
    >
      <!-- 图片：加上 block 防止底部留白，object-contain 保持比例 -->
      <img :src="item.icon" class="mb-1 block h-12 w-12 object-contain" alt="icon" />
      <!-- 文字：加上 truncate 防止文字过长换行 -->
      <span class="mt-1 w-full truncate text-center text-xs font-medium text-gray-700">
        {{ item.name }}
      </span>
    </div>
  </div>
</template>
