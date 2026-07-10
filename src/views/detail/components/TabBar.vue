<script setup>
// 1. 接收父组件传来的帖子互动数据
const props = defineProps({
  likes: { type: Number, default: 0 },
  isLiked: { type: Boolean, default: false }, // 是否已点赞
  favs: { type: Number, default: 0 },
  isFaved: { type: Boolean, default: false }, // 是否已收藏
  comments: { type: Number, default: 0 },
})

// 2. 注册向父组件大喊的暗号
const emit = defineEmits([
  'click-input', // 点击输入框
  'toggle-like', // 切换点赞
  'toggle-fav', // 切换收藏
  'click-comment', // 点击评论图标
])

// 3. 数字格式化小工具 (10000 -> 1w，小红书标准做法)
const formatNum = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w' // 保留一位小数，例如 1.2w
  }
  return num
}

// 4. 事件触发函数 (上报给老板 index.vue 去处理实际数据)
const handleInputClick = () => emit('click-input')
const handleLike = () => emit('toggle-like', !props.isLiked)
const handleFav = () => emit('toggle-fav', !props.isFaved)
const handleCommentClick = () => emit('click-comment')
</script>
<template>
  <div
    class="fixed bottom-0 left-0 z-50 flex h-[56px] w-full items-center border-t border-gray-100 bg-white px-4 pb-[env(safe-area-inset-bottom)]"
  >
    <!-- 左侧：评论打字框 -->
    <div
      class="flex h-9 flex-1 cursor-text items-center rounded-full bg-gray-100 px-4 text-sm text-gray-500 transition-colors active:bg-gray-200"
      @click="handleInputClick"
    >
      <i class="iconfont icon-xiezi mr-1 text-lg"></i>
      <span>说点什么...</span>
    </div>
    <!-- 右侧：点赞+收藏+评论 -->
    <div class="ml-5 flex items-center gap-5 text-gray-700">
      <!-- 点赞 -->
      <!-- 点赞动画: active:scale-90 点击时会有个轻微缩小的回弹效果 -->
      <div
        class="flex cursor-pointer items-center gap-1 transition-transform active:scale-90"
        @click="handleLike"
      >
        <i
          class="iconfont text-[22px] transition-colors"
          :class="isLiked ? 'icon-hongxin text-[#ff2442]' : 'icon-zan'"
        ></i>
        <!-- 只有当数字大于 0 时才显示 -->
        <span class="text-xs font-medium" v-if="likes > 0">{{ formatNum(likes) }}</span>
        <span class="text-xs font-medium" v-else>赞</span>
      </div>

      <!-- 收藏 -->
      <div
        class="flex cursor-pointer items-center gap-1 transition-transform active:scale-90"
        @click="handleFav"
      >
        <i
          class="iconfont text-[22px] transition-colors"
          :class="isFaved ? 'icon-Filled_Star text-[#ffb020]' : 'icon-shoucang'"
        ></i>
        <span class="text-xs font-medium" v-if="favs > 0">{{ formatNum(favs) }}</span>
        <span class="text-xs font-medium" v-else>收藏</span>
      </div>
      <!-- 评论气泡 (跳转/滚动到评论区) -->
      <div
        class="flex cursor-pointer items-center gap-1 transition-transform active:scale-90"
        @click="handleCommentClick"
      >
        <i class="iconfont icon-pinglun text-[22px]"></i>
        <span class="text-xs font-medium" v-if="comments > 0">{{ formatNum(comments) }}</span>
        <span class="text-xs font-medium" v-else>评论</span>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
