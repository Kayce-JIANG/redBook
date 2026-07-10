<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
})

// 正则表达式：匹配 #话题# 或者 #话题 (后接空格或换行)
// 将其替换为带颜色的 span 标签
const formattedContent = computed(() => {
  if (!props.content) return ''

  // 1. 防止 XSS 攻击（简单处理，实际项目建议用 DOMPurify）
  let safeContent = props.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // 2. 识别话题并高亮
  // 匹配 #开头，非空格非标点结尾的部分
  const hashtagRegex = /#([^\s#]+)/g
  return safeContent.replace(
    hashtagRegex,
    '<span class="text-[#13386c] cursor-pointer hover:opacity-80">#$1</span>',
  )
})
</script>

<template>
  <div class="bg-white px-4 py-3">
    <!-- 标题部分 -->
    <h1 v-if="title" class="mb-2 text-[17px] font-bold leading-snug text-gray-900">
      {{ title }}
    </h1>

    <!-- 正文内容部分 -->
    <!-- whitespace-pre-wrap 保证了换行符能够正常显示 -->
    <div
      class="mb-4 whitespace-pre-wrap text-[15px] leading-relaxed text-gray-800"
      v-html="formattedContent"
    ></div>

    <!-- 底部元数据：发布时间与地点 -->
    <div class="flex items-center text-[12px] text-gray-400">
      <span class="mr-2">{{ date }}</span>
      <span v-if="location">{{ location }}</span>
    </div>

    <!-- 分割线 -->
    <div class="mt-4 border-b border-gray-50"></div>
  </div>
</template>

<style scoped>
/* 如果有特殊的 emoji 字体需求可以在这里定义 */
</style>
