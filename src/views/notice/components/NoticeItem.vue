<script setup>
import NoticeAvatar from './NoticeAvatar.vue'

// 接收父组件(NoticeList)传来的单条数据
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <!-- 外层容器：Flex布局，点击带有背景色过渡效果 -->
  <div
    class="flex cursor-pointer items-center px-4 py-3 transition-colors hover:bg-gray-50 active:bg-gray-100"
  >
    <!-- 1. 左侧头像  -->
    <div class="relative mr-3 h-12 w-12 flex-shrink-0">
      <NoticeAvatar :type="item.type" :src="item.avatar" />
    </div>

    <!-- 2. 中间内容区 -->
    <div class="min-w-0 flex-1">
      <div class="mb-1 flex items-center justify-between">
        <!-- 标题（人名/群名/系统通知） -->
        <span class="truncate text-base font-medium text-gray-900">
          {{ item.title }}
        </span>
      </div>
      <!-- 消息预览内容 -->
      <div class="truncate text-[13px] text-gray-500">
        {{ item.lastMessage }}
      </div>
    </div>

    <!-- 3. 右侧状态区 -->
    <div class="ml-3 flex h-full flex-shrink-0 flex-col items-end justify-between py-0.5">
      <!-- 时间 -->
      <span class="mb-1.5 text-xs text-gray-400">{{ item.time }}</span>

      <!-- 状态图标区（未读红点 / 免打扰图标） -->
      <div class="flex h-4 items-center">
        <!-- 免打扰图标 (使用阿里图库) -->
        <i v-if="item.isMuted" class="iconfont icon-Fill text-sm text-gray-300"></i>

        <!-- 未读红点 (免打扰时的样式 vs 正常未读样式) -->
        <template v-else-if="item.unreadCount > 0">
          <span
            class="flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-medium text-white"
          >
            {{ item.unreadCount > 99 ? '99+' : item.unreadCount }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
