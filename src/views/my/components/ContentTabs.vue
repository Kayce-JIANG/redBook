<script setup>
import { computed } from 'vue'

// 1. 定义 Props：接收父组件传来的当前高亮 Tab 标识
const props = defineProps({
  activeTab: {
    type: String,
    required: true,
    default: 'notes',
  },
})

// 2. 定义 Emits：向父组件抛出切换事件
const emit = defineEmits(['change'])

// 3. 数据驱动：将 Tab 栏配置抽象为数组，方便后续扩展或权限控制
// isPrivate: true 代表需要展示“仅自己可见”的锁定图标
const tabsConfig = [
  { id: 'notes', label: '笔记', isPrivate: false },
  { id: 'comments', label: '评论', isPrivate: true },
  { id: 'collections', label: '收藏', isPrivate: true },
  { id: 'likes', label: '赞过', isPrivate: false },
]

// 4. 交互逻辑：点击 Tab
const handleTabClick = (tabId) => {
  // 如果点击的是当前已经选中的 Tab，阻止重复触发
  if (props.activeTab === tabId) return
  emit('change', tabId)
}
</script>

<template>
  <!-- 
    整体容器：
    bg-[#f9f9f9] 保持与父级背景一致，防止滚动吸顶时文字重叠穿透
    h-11 设定固定高度，利于布局对齐
  -->
  <div class="relative flex h-11 w-full items-center justify-between bg-[#f9f9f9] px-2">
    <!-- 左侧：Tab 列表 -->
    <div class="flex h-full items-center space-x-6">
      <!-- 循环渲染 Tab 项 -->
      <div
        v-for="tab in tabsConfig"
        :key="tab.id"
        class="relative flex h-full cursor-pointer items-center justify-center transition-all duration-300"
        @click="handleTabClick(tab.id)"
      >
        <!-- 文字与图标区 -->
        <div class="flex items-center space-x-[2px]">
          <!-- 如果是私密项，展示小锁头图标 (阿里图库) -->
          <i
            v-if="tab.isPrivate"
            class="iconfont icon-suoding_o text-[12px]"
            :class="activeTab === tab.id ? 'text-[#333]' : 'text-gray-400'"
          ></i>

          <!-- 文字标签 -->
          <span
            class="text-[15px] transition-colors duration-300"
            :class="[
              activeTab === tab.id
                ? 'font-bold text-[#333]' // 选中态：加粗、深灰色
                : 'font-normal text-gray-500 hover:text-gray-700', // 未选中态：浅灰色
            ]"
          >
            {{ tab.label }}
          </span>
        </div>

        <!-- 
          底部红线指示器 (Active Indicator) 
          通过 v-show 控制显示，配合绝对定位在底部居中
        -->
        <div
          v-show="activeTab === tab.id"
          class="absolute bottom-[4px] left-1/2 h-[3px] w-4 -translate-x-1/2 rounded-full bg-red-500 transition-all duration-300"
        ></div>
      </div>
    </div>

    <!-- 右侧：搜索图标 -->
    <div class="flex h-full cursor-pointer items-center justify-center px-2 active:opacity-60">
      <i class="iconfont icon-sousuo text-[18px] font-bold text-gray-500"></i>
    </div>
  </div>
</template>

<style scoped>
/* 确保阿里图库的基础样式正常加载 */
.iconfont {
  font-family: 'iconfont' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
