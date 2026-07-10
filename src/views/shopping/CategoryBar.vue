<script setup>
// ❌ 不需要引入 api 和 router 了
// import { getCategoryList } from '@/api/categoryList'
// import { useRouter, useRoute } from 'vue-router'

// ✅ 1. 定义 Props：接收父组件传下来的“工资”
const props = defineProps({
  // 接收分类列表数据
  list: {
    type: Array,
    default: () => [],
  },
  // 接收当前哪个是选中的（用于高亮红线）
  active: {
    type: String,
    default: 'recommend',
  },
})

// ✅ 2. 定义 Emits：准备好通知父组件的“喇叭”
const emit = defineEmits(['change-tab'])

// ✅ 3. 点击事件
const handleClick = (item) => {
  // 不直接跳路由，而是告诉父组件：“老板，用户点了这个！”
  // 传回 item.value (比如 'digital')
  emit('change-tab', item.value)
}

// ✅ 4. 判断高亮 (直接拿父组件传下来的 active 对比)
const isActive = (val) => {
  return props.active === val
}
</script>

<template>
  <div class="scroll-container">
    <div class="nav-wrapper">
      <!-- 注意：这里遍历的是 props 里的 list -->
      <div class="nav-item" v-for="item in list" :key="item.id" @click="handleClick(item)">
        <!-- 动态类名 -->
        <span class="text" :class="{ 'active-text': isActive(item.value) }">
          {{ item.name }}
        </span>
        <!-- 红线 -->
        <div v-if="isActive(item.value)" class="red-line"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 你的 CSS 写的很好，原封不动保留即可 */
.scroll-container {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
}

.nav-wrapper {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px 5px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.nav-wrapper::-webkit-scrollbar {
  display: none;
}
.nav-wrapper {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
  position: relative;
}

.text {
  font-size: 15px;
  color: #666;
  transition: all 0.2s;
}

.active-text {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.red-line {
  width: 20px;
  height: 3px;
  background-color: #ff2442;
  border-radius: 2px;
  margin-top: 4px;
  position: absolute;
  bottom: -8px;
}
</style>
