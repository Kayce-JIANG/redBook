<template>
  <!-- 外层固定大小，裁切成圆形，加个灰底防图片加载失败 -->
  <div
    class="border-gray-150 flex h-full w-full items-center justify-center overflow-hidden rounded-full border bg-gray-100"
  >
    <!-- 系统消息：给个特定的背景色和图标 -->
    <div v-if="type === 'system'" class="flex h-full w-full items-center justify-center bg-red-400">
      <!-- 这里用阿里的系统通知图标，类名记得换成你自己的 -->
      <i class="iconfont icon-xitongtongzhi text-xl text-white"></i>
    </div>

    <!-- 正常群聊或私聊头像 -->
    <img v-else-if="src" :src="src" class="h-full w-full object-cover" alt="avatar" />

    <!-- 兜底：如果没有头像数据，显示默认用户图标 -->
    <i v-else class="iconfont icon-user text-2xl text-gray-400"></i>
  </div>
</template>

<script setup>
// 接收父组件(NoticeItem)传过来的头像链接和类型
defineProps({
  src: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'private', // private(私聊), group(群聊), system(系统)
  },
})
</script>
