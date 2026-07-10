<script setup>
import { ref } from 'vue'

const footerList = ref([
  { id: 1, icon: 'icon-shouye', path: '/index' },
  { id: 2, icon: 'icon-shouye1', path: '/shopping' },
  { id: 3, icon: 'icon-lingdang', path: '/notice' },
  { id: 4, icon: 'icon-wodedefuben', path: '/my' },
])
</script>

<template>
  <div
    v-if="!$route.path.includes('/detail')"
    class="fixed bottom-0 left-0 z-50 h-[60px] w-full border-t border-gray-100 bg-white shadow-sm"
  >
    <div class="mx-auto h-full max-w-[1080px]">
      <ul class="m-0 flex h-full w-full list-none items-center p-0">
        <li v-for="item in footerList" :key="item.id" class="h-full flex-1">
          <router-link :to="item.path" v-slot="{ isActive }">
            <div
              class="flex h-full w-full items-center justify-center transition-transform active:scale-90"
            >
              <i
                class="iconfont text-[24px] font-semibold transition-colors"
                :class="[
                  item.icon,
                  isActive ? 'text-brand' : 'text-gray-400', // isActive 是 router-link 自动告诉我们的布尔值
                ]"
              ></i>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
