<script setup></script>
<template>
  <!-- 1. 外层：固定高度、背景白、固定定位、底部细线 -->
  <header
    class="fixed left-0 top-0 z-50 h-[72px] w-full border-b border-gray-50 bg-white shadow-sm"
  >
    <!-- header.vue 优化版逻辑 -->
    <div class="mx-auto flex h-full w-full items-center px-2">
      <!-- 关键：移动端用 w-full，px-2 留出微小边距 -->

      <!-- Logo 缩窄一点 -->
      <div class="flex-shrink-0">
        <img src="@/assets/image/logo.png" class="h-[20px] w-[80px] object-contain" />
      </div>

      <!-- 搜索框：在小屏下不要用固定的 60vw，改用 flex-1 让它自动撑满剩余空间 -->
      <div class="relative flex-1 px-2">
        <input
          type="text"
          placeholder="搜索更多内容"
          class="h-[32px] w-full rounded-full bg-[#f7f7f7] pl-3 pr-8 text-[12px] outline-none"
        />
        <i
          class="iconfont icon-sousuo absolute right-5 top-1/2 -translate-y-1/2 text-[16px] text-gray-400"
        ></i>
      </div>

      <!-- 右侧图标固定 -->
      <div class="flex-shrink-0">
        <i class="iconfont icon-mulu text-[20px]"></i>
      </div>
    </div>
  </header>

  <!-- 占位符：防止下方内容被固定头部遮挡（高度等于 header 高度） -->
  <div class="h-[72px]"></div>
</template>
