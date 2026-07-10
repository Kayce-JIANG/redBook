<script setup>
import { ref, onMounted } from 'vue'
import NoteCard from './NoteCard.vue'

const props = defineProps({
  notes: {
    type: Array,
    required: true,
    default: () => [],
  },
  loading: Boolean,
  hasMore: Boolean,
})

const emit = defineEmits(['setupObserver'])
const loadingTrigger = ref(null)

onMounted(() => {
  // 将 DOM 节点暴露给外层的 IntersectionObserver
  emit('setupObserver', loadingTrigger.value)
})
</script>
<template>
  <!-- Tailwind CSS 多列布局实现瀑布流 -->
  <div class="min-h-screen bg-gray-100 p-2">
    <div class="w-full columns-2 gap-2 space-y-0">
      <NoteCard v-for="note in notes" :key="note.id" :note="note" />
    </div>

    <!-- 触底加载触发器 -->
    <div
      ref="loadingTrigger"
      class="mt-2 flex h-10 items-center justify-center text-xs text-gray-400"
    >
      <span v-if="loading"
        ><i class="iconfont icon-Gc_56_public-LoadingOutlined mr-1 animate-spin"></i>
        加载中...</span
      >
      <span v-else-if="!hasMore">没有更多了~</span>
    </div>
  </div>
</template>
