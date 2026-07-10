<template>
  <header
    class="sticky top-0 z-10 flex h-12 items-center justify-between border-b border-gray-50 bg-white px-4"
  >
    <!-- 左侧：通常是一个占位符，或者“发现群聊”图标 -->

    <div class="flex w-20 items-center"></div>

    <!-- 中间：页面标题 -->
    <div class="flex-1 text-center">
      <h1 class="text-[17px] font-medium text-gray-900">消息</h1>
    </div>

    <!-- 右侧：搜索和添加图标 -->
    <div class="flex w-20 items-center justify-end space-x-4">
      <!-- 搜索图标 -->
      <button class="transition-opacity active:opacity-50">
        <span class="iconfont icon-sousuo"></span>
      </button>

      <!-- 添加/开启群聊图标 -->
      <button class="transition-opacity active:opacity-50">
        <span class="iconfont icon-checkbox-plus"></span>
      </button>
    </div>
  </header>
</template>

<script setup></script>

<style scoped></style>
