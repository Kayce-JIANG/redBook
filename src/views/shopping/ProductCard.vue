<script setup>
// 1. 定义 Props 接收父组件 (ProductList) 传过来的数据
// 这里的 'data' 对应了你在 ProductList 循环时写的 :data="item"
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <!-- 卡片容器：白色背景、圆角、阴影、溢出隐藏 -->
  <div class="card-container mb-2 flex flex-col overflow-hidden rounded-lg bg-white shadow-sm">
    <!-- 1. 商品主图：使用 object-cover 保证图片不缩放变形 -->
    <div class="relative w-full pb-[125%]">
      <!-- 4:5 黄金比例 -->
      <img
        :src="data.cover"
        class="absolute inset-0 h-full w-full object-cover"
        alt="product-img"
      />
    </div>

    <!-- 2. 信息区域 -->
    <div class="flex flex-col gap-1 p-2">
      <!-- 商品标题：最多显示两行，超出显示省略号 -->
      <h3 class="line-clamp-2 h-9 text-sm font-medium leading-snug text-gray-800">
        {{ data.title }}
      </h3>

      <!-- 营销标签 (tag) -->
      <div class="mt-1 flex flex-wrap gap-1">
        <span
          v-if="data.tag"
          class="rounded-sm border border-red-400 px-1 text-[10px] text-red-500"
        >
          {{ data.tag }}
        </span>
      </div>

      <!-- 价格区域 -->
      <div class="mt-1 flex items-baseline">
        <span class="text-xs font-bold text-red-500">￥</span>
        <span class="text-lg font-bold text-red-500">{{ data.price }}</span>
      </div>

      <!-- 底部辅助信息：作者和销量 -->
      <div class="mt-1 flex items-center justify-between border-t border-gray-50 pt-2">
        <!-- 作者 (这里假设你的接口里有 authorAvatar 和 authorName) -->
        <div class="flex items-center gap-1">
          <img
            :src="data.authorAvatar || 'https://via.placeholder.com/20'"
            class="h-4 w-4 rounded-full"
          />
          <span class="w-16 truncate text-[10px] text-gray-500">{{
            data.authorName || '官方店'
          }}</span>
        </div>

        <!-- 销量 (sales) -->
        <span class="text-[10px] text-gray-400">
          {{ data.sales }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 标题两行省略号的 CSS 兜底（如果 Tailwind 的 line-clamp 没生效） */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
