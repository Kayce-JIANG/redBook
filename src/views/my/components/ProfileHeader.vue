<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({
      avatar: '',
      username: '未命名用户',
      xiaohongshuId: '--',
      ipLocation: '未知',
      bio: '点击这里，填写简介',
      gender: null,
      age: 0,
      follows: 0,
      fans: 0,
      likesAndCollects: 0,
    }),
  },
})
const emit = defineEmits(['edit-profile', 'open-settings'])

//  图片加载失败的兜底处理
const handleImgError = (e) => {
  // 增加判断：防止 FALLBACK_IMAGE 自身也加载失败从而导致无限死循环报错
  if (e.target.src !== FALLBACK_IMAGE) {
    e.target.src = FALLBACK_IMAGE
  }
}
</script>

<template>
  <!-- 增加了 pb-2 留出一些底部空间 -->
  <div class="relative w-full pb-2 pt-12 text-white drop-shadow-md">
    <!-- ================= 1. 上半部分：核心资料 ================= -->
    <div class="flex flex-col px-1">
      <!-- 头像区域 -->
      <div class="relative h-20 w-20 shrink-0">
        <img
          :src="
            user?.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          "
          alt="avatar"
          class="h-full w-full rounded-full border-[1.5px] border-white/30 bg-gray-500 object-cover"
        />
        <!-- 右下角黄底加号 -->
        <div
          class="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#3a3a3a] bg-yellow-400 text-black"
        >
          <i class="iconfont icon-jia text-[10px] font-bold"></i>
        </div>
      </div>

      <!-- 昵称 -->
      <div class="mt-4 text-2xl font-bold tracking-wide">
        {{ user?.username || '未命名用户' }}
      </div>

      <!-- 小红书号 & IP 属地 -->
      <div class="mt-1 flex items-center space-x-3 text-xs text-white/80">
        <span>小红书号：{{ user?.xiaohongshuId || '--' }}</span>
        <span>IP属地：{{ user?.ipLocation || '未知' }}</span>
      </div>

      <!-- 个人简介 -->
      <div class="mt-3 text-sm leading-relaxed text-white/95">
        {{ user?.bio || '点击这里，填写简介' }}
      </div>

      <!-- 性别/年龄 Tag -->
      <div class="mt-2 flex items-center">
        <div
          class="inline-flex items-center justify-center space-x-1 rounded-full bg-white/20 px-2 py-[2px] text-[10px] backdrop-blur-sm"
        >
          <i
            v-if="user?.gender === 0"
            class="iconfont icon-CRM_icon_nvxing text-[10px] text-pink-300"
          ></i>
          <i v-else-if="user?.gender === 1" class="iconfont icon-nan text-[10px] text-blue-300"></i>
          <span>{{ user?.age || '20' }}岁</span>
        </div>
      </div>
    </div>

    <!-- ================= 2. 下半部分：数据 & 按钮 ================= -->
    <div class="mt-6 flex w-full items-center justify-between px-1">
      <!-- 左侧：粉丝数据  -->
      <div class="flex items-center space-x-3 whitespace-nowrap text-sm">
        <div class="flex cursor-pointer items-baseline space-x-[2px]">
          <span class="text-base font-bold">{{ user?.follows || 0 }}</span>
          <span class="text-[11px] text-white/80">关注</span>
        </div>
        <div class="flex cursor-pointer items-baseline space-x-[2px]">
          <span class="text-base font-bold">{{ user?.fans || 0 }}</span>
          <span class="text-[11px] text-white/80">粉丝</span>
        </div>
        <div class="flex cursor-pointer items-baseline space-x-[2px]">
          <span class="text-base font-bold">{{ user?.likesAndCollects || 0 }}</span>
          <span class="text-[11px] text-white/80">获赞与收藏</span>
        </div>
      </div>

      <!-- 右侧：操作按钮  -->
      <div class="flex shrink-0 items-center space-x-2 pl-2">
        <button
          @click="emit('edit-profile')"
          class="h-7 whitespace-nowrap rounded-full border border-white/60 px-3 text-[11px] font-medium transition-colors active:bg-white/20"
        >
          编辑资料
        </button>
        <button
          @click="emit('open-settings')"
          class="flex h-7 w-7 items-center justify-center rounded-full border border-white/60 transition-colors active:bg-white/20"
        >
          <i class="iconfont icon-setting text-[12px]"></i>
        </button>
      </div>
    </div>
  </div>
</template>
