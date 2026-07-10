<script setup>
defineProps({
  note: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <!-- break-inside-avoid 防止被多列布局截断 -->
  <div class="relative mb-2 break-inside-avoid overflow-hidden rounded-lg bg-white shadow-sm">
    <!-- 仅自己可见标识 -->
    <div
      v-if="note.isPrivate"
      class="absolute left-2 top-2 z-10 flex items-center gap-1 rounded bg-black/40 px-2 py-0.5 text-[10px] text-white"
    >
      <i class="iconfont icon-jinzijikejian text-[10px]"></i> 仅自己可见
    </div>

    <!-- 视频标识 -->
    <div
      v-if="note.isVideo"
      class="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-white"
    >
      <i class="iconfont icon-play text-[12px]"></i>
    </div>

    <!-- 封面 (用 object-cover 保证不拉伸，高度让图片自适应撑开) -->
    <img :src="note.cover" class="w-full object-cover" loading="lazy" />

    <!-- 内容区 -->
    <div class="p-2">
      <!-- 标题 (如果没有则不显示) -->
      <h3
        v-if="note.title"
        class="mb-2 line-clamp-2 text-sm font-medium leading-tight text-gray-800"
      >
        {{ note.title }}
      </h3>

      <!-- 底部信息 -->
      <div class="mt-auto flex items-center justify-between">
        <div class="flex items-center gap-1.5">
          <img :src="note.author.avatar" class="h-4 w-4 rounded-full object-cover" />
          <span class="max-w-[80px] truncate text-xs text-gray-500">{{ note.author.name }}</span>
        </div>
        <div class="flex items-center gap-1 text-gray-400">
          <i class="iconfont icon-heart-empty text-xs"></i>
          <span class="text-[11px]">{{ note.likes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
