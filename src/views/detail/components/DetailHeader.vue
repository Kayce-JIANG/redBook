<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  author: {
    type: Object,
    default: () => ({
      name: '',
      avatar: '',
      isFollowed: false,
    }),
  },
})

// 添加 'share' 事件
const emit = defineEmits(['toggle-follow', 'share'])
const router = useRouter()

const handleBack = () => {
  router.back()
}

const handleFollow = () => {
  emit('toggle-follow', !props.author.isFollowed)
}

// 新增：处理分享点击
const handleShare = () => {
  emit('share')
}
</script>

<template>
  <div class="fixed left-0 top-0 z-50 flex h-[54px] w-full items-center bg-white px-4 shadow-sm">
    <!-- 返回按钮 -->
    <div class="flex w-16 cursor-pointer justify-start" @click="handleBack">
      <i class="iconfont icon-a-huaban1fuben44 text-3xl text-gray-800"></i>
    </div>

    <!-- 作者头像+id -->
    <div class="flex flex-1 items-center justify-center gap-2 overflow-hidden">
      <img
        class="h-8 w-8 rounded-full border border-gray-100 object-cover"
        :src="
          author?.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        "
        alt="头像"
      />
      <span class="max-w-[120px] truncate text-[15px] font-medium text-gray-800">
        {{ author?.name || '未知用户' }}
      </span>
    </div>

    <!-- 右侧操作区：关注按钮 + 分享按钮 (修改了这里：去掉了定宽 w-20，增加了 gap-4 间距) -->
    <div class="flex items-center justify-end gap-4">
      <button
        @click="handleFollow"
        class="whitespace-nowrap rounded-full border px-3 py-1 text-[13px] font-medium transition-colors duration-200"
        :class="
          author?.isFollowed
            ? 'border-gray-300 bg-transparent text-gray-400'
            : 'border-transparent bg-[#ff2442] text-white'
        "
      >
        {{ author?.isFollowed ? '已关注' : '关注' }}
      </button>

      <!-- 删除了原有的 "code Code" 乱码 -->
      <div
        class="flex cursor-pointer items-center justify-center transition-transform active:scale-90"
        @click="handleShare"
      >
        <i class="iconfont icon-zhuanfa text-[22px] text-gray-700"></i>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
