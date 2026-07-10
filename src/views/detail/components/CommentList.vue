<script setup>
import { computed } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})

const commentCount = computed(() => props.list.length)
</script>

<template>
  <div class="mt-2 bg-white px-4 py-4 pb-20">
    <!-- 头部：评论总数  -->
    <div class="mb-6 text-[13px] text-gray-400">共 {{ commentCount }} 条评论</div>

    <!-- 评论列表 -->
    <div v-if="list.length > 0">
      <div v-for="item in list" :key="item.id" class="mb-5 flex items-start last:mb-0">
        <!-- 1. 左侧头像 - 固定大小，圆角 -->
        <div class="mr-3 flex-shrink-0">
          <img
            :src="item.user?.avatar || item.avatar"
            class="h-8 w-8 rounded-full border-[0.5px] border-gray-100 object-cover"
          />
        </div>

        <!-- 2. 中间主体  -->
        <div class="min-w-0 flex-1">
          <!-- 用户名：颜色要浅，字号小 -->
          <div class="mb-0.5 text-[12px] text-gray-400">
            {{ item.user?.name || item.nickname }}
          </div>
          <!-- 评论内容：深色，行高适中 -->
          <div class="mb-1.5 break-words text-[14px] leading-snug text-gray-800">
            {{ item.content }}
          </div>
          <!-- 底部信息：时间、地点、回复按钮 -->
          <div class="flex items-center text-[11px] text-gray-400">
            <span class="mr-2">{{ item.publishTime || item.date }}</span>
            <span v-if="item.location" class="mr-2">{{ item.location }}</span>
            <span class="cursor-pointer font-semibold hover:text-gray-600">回复</span>
          </div>
        </div>

        <!-- 3. 右侧点赞 - 固定宽度，居中对齐 -->
        <div class="ml-2 flex w-10 flex-col items-center">
          <i class="iconfont icon-aixin text-[16px] text-gray-400"></i>
          <span class="mt-0.5 text-[10px] text-gray-400">{{ item.likes }}</span>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="py-10 text-center text-sm italic text-gray-300">
      还没有评论，快来抢沙发吧~
    </div>
  </div>
</template>
