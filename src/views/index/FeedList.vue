<script setup>
import { onMounted, ref, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPostList } from '@/api/post.js'

const route = useRoute()
const router = useRouter()

// --- 响应式状态 ---
const postList = ref([])
const loading = ref(false)
const isFinished = ref(false) // 是否全部加载完毕
const page = ref(1) // 当前页码
const sentinelRef = ref(null) // 底部触底探测器
let loadMoreObserver = null

/**
 * 加载数据函数
 * @param {boolean} isRefresh - 是否是刷新（切换频道时为true，触底加载为false）
 */
const loadData = async (isRefresh = false) => {
  if (loading.value || (isFinished.value && !isRefresh)) return

  if (isRefresh) {
    page.value = 1
    postList.value = []
    isFinished.value = false
  }

  loading.value = true
  try {
    const category = route.params.category || 'recommend'
    // 假设接口支持分页：getPostList(category, page, pageSize)
    const res = await getPostList(category, page.value)

    const newData = res.data || res

    if (newData.length === 0) {
      isFinished.value = true
    } else {
      // 关键：触底加载是把新数据“推入”数组，而不是替换
      postList.value = [...postList.value, ...newData]//追加
      page.value++
    }
  } catch (error) {
    console.error('获取列表失败:', error)
  } finally {
    loading.value = false
  }
}

// --- 触底加载逻辑 (Web端新方法) ---
const initLoadMoreObserver = () => {
  loadMoreObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !loading.value && !isFinished.value) {
        console.log('触底了，加载下一页...')
        loadData(false)
      }
    },
    { threshold: 0.5 },
  )

  if (sentinelRef.value) loadMoreObserver.observe(sentinelRef.value)
}

const goDetail = (id) => {
  router.push({ path: '/detail', query: { id } })
}

onMounted(() => {
  loadData(true)
  initLoadMoreObserver()
})

onUnmounted(() => {
  if (loadMoreObserver) loadMoreObserver.disconnect()
})

// 监听路由参数变化，切换频道
watch(
  () => route.params.category,
  () => loadData(true),
)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-2 pb-24">
    <!-- 1. 骨架屏提示 (增强用户体验) -->
    <div v-if="loading && postList.length === 0" class="columns-2 gap-2 space-y-2">
      <div v-for="i in 6" :key="i" class="mb-2 h-64 animate-pulse rounded-lg bg-gray-200"></div>
    </div>

    <!-- 2. 正式列表 -->
    <div v-show="postList.length > 0" class="columns-2 gap-2 space-y-2">
      <div
        v-for="item in postList"
        :key="item.id"
        @click="goDetail(item.id)"
        class="mb-2 cursor-pointer break-inside-avoid overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm"
      >
        <!-- 封面图：使用 v-lazy 并在 CSS 中给个背景色和最小高度 -->
        <div class="img-container bg-gray-100">
          <img
            v-lazy="item.cover"
            class="block w-full object-cover transition-opacity duration-300"
            alt="笔记封面"
          />
        </div>

        <div class="flex flex-col gap-1 p-2 text-left">
          <h3 class="line-clamp-2 text-[13px] font-medium leading-snug text-gray-800">
            {{ item.title }}
          </h3>
          <div class="mt-1 flex items-center justify-between">
            <div class="flex items-center gap-1 overflow-hidden">
              <!-- 头像也可以用懒加载 -->
              <img v-lazy="item.avatar" class="h-4 w-4 rounded-full bg-gray-100" alt="作者头像" />
              <span class="truncate text-[10px] text-gray-500">{{ item.author }}</span>
            </div>
            <div class="flex items-center gap-0.5 text-gray-400">
              <i class="iconfont icon-aixin1 text-[12px]"></i>
              <span class="text-[10px]">{{ item.likes }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. 触底探测器 & 加载状态提示 -->
    <div ref="sentinelRef" class="py-4 text-center text-xs text-gray-400">
      <p v-if="loading && postList.length > 0">正在努力加载中...</p>
      <p v-else-if="isFinished">—— 已经到底啦 ——</p>
      <p v-else-if="postList.length === 0 && !loading">暂无笔记数据</p>
    </div>
  </div>
</template>

<style scoped>
/* 瀑布流布局优化：防止图片加载前高度为0导致所有卡片堆在一起 */
.img-container {
  min-height: 150px; /* 必须给一个基础高度，否则 IntersectionObserver 会一次性触发所有加载 */
}

/* 配合 v-lazy 指令的淡入效果 */
img {
  opacity: 0;
}
img[src] {
  opacity: 1;
}

/* 强制瀑布流分两列 */
.columns-2 {
  column-count: 2;
}
</style>
