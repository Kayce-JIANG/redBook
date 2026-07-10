<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
// 1. 接口与组件引入
import { getDetailComment, getDetailNotecontent, toggleLikeApi, toggleFavApi } from '@/api/post'
import { toggleFollowApi } from '@/api/user'
import { useToggleAction } from '@/composables/useToggleAction'
import DetailHeader from './components/DetailHeader.vue'
import ImgSlider from './components/ImgSlider.vue'
import NoteContent from './components/NoteContent.vue'
import CommentList from './components/CommentList.vue'
import TabBar from './components/TabBar.vue'

// 2. 核心数据与状态定义
const route = useRoute()
const noteId = route.query.id // 从路由参数获取当前帖子的 ID

// 帖子正文数据初始化
const noteContent = ref({
  id: '',
  likes: 0,
  images: [],
  isLiked: false,
  favs: 0,
  isFaved: false,
  comments: 0,
  author: {
    // 给一个默认的 author 结构，防止子组件初始渲染时报错
    id: '',
    name: '',
    avatar: '',
    isFollowed: false,
  },
})

// 评论列表数据
const comment = ref([])

// 点赞 / 收藏 — 使用通用 composable，消除重复代码
const { isPending: isLikePending, toggle: handleLikeToggle } = useToggleAction(noteContent, {
  statusKey: 'isLiked',
  countKey: 'likes',
  apiFn: toggleLikeApi,
  errorMsg: '操作失败，请重试',
})

const { isPending: isFavPending, toggle: handleFavToggle } = useToggleAction(noteContent, {
  statusKey: 'isFaved',
  countKey: 'favs',
  apiFn: toggleFavApi,
  errorMsg: '收藏失败',
})

// 3. 数据请求逻辑
// 获取帖子正文
const fetchDetailNoteContent = async (id) => {
  try {
    const res = await getDetailNotecontent(id)
    if (res.data) {
      noteContent.value = res.data
    } else {
      noteContent.value = res
    }
  } catch (error) {
    console.error('获取正文失败：', error)
  }
}

// 获取帖子评论
const fetchDetailComment = async (id) => {
  try {
    const res = await getDetailComment(id)
    comment.value = res.data.list || res.data
  } catch (error) {
    console.error('获取评论失败:', error)
  }
}

// 4. 用户交互逻辑
// 【处理关注】 - 实现了状态更新
const handleFollowChange = async (newStatus) => {
  // 1. 安全检查：确保有 author 数据
  if (!noteContent.value || !noteContent.value.author) return

  // 2. 记录旧状态，用于接口失败时回滚
  const previousStatus = noteContent.value.author.isFollowed

  // 3. 乐观更新：前端直接修改数据，让按钮瞬间发生变化（无延迟感，体验好）
  noteContent.value.author.isFollowed = newStatus

  // 4. 发起真实的 API 请求
  try {
    const res = await toggleFollowApi({
      user_id: noteContent.value.author.id, // 传给后端的作者ID
      status: newStatus, // 传给后端的true/false状态
    })

    // 如果后端 code 不是 200，说明报错了
    if (res.code !== 200) throw new Error(res.msg)

    // 成功的话可以给个小提示
    ElMessage.success(newStatus ? '关注成功' : '已取消关注')
  } catch (error) {
    // 失败回滚：如果 Mock 接口报错（网络断了等），把状态改回来
    noteContent.value.author.isFollowed = previousStatus
    ElMessage.error(error.message || '关注操作失败，请重试')
  }
}

// 分享
const handleShareClick = () => {
  console.log('点击了分享按钮')
  // 这里可以写弹出分享面板(Bottom Sheet / Dialog)的逻辑
  ElMessage.success('准备唤起分享面板')
}

// 其他交互
const openCommentBox = () => console.log('打开输入框')
const scrollToComment = () => console.log('滚动评论')

// 5. 生命周期钩子
onMounted(() => {
  if (noteId) {
    fetchDetailNoteContent(noteId)
    fetchDetailComment(noteId)
  }
})
</script>

<template>
  <div class="detail-page">
    <!-- 顶部作者信息、关注、分享栏 -->
    <DetailHeader
      :author="noteContent?.author"
      @toggle-follow="handleFollowChange"
      @share="handleShareClick"
    />

    <!-- 轮播图区域 -->
    <ImgSlider :images="noteContent?.images" />

    <!-- 正文区域 -->
    <NoteContent
      :title="noteContent?.title"
      :content="noteContent?.content"
      :date="noteContent?.publishTime"
      :location="noteContent?.location"
    />

    <!-- 评论列表 -->
    <CommentList :list="comment" />

    <!-- 底部操作栏 (点赞、收藏、评论输入入口) -->
    <TabBar
      :likes="noteContent?.likes"
      :isLiked="noteContent?.isLiked"
      :favs="noteContent?.favs"
      :isFaved="noteContent?.isFaved"
      :comments="noteContent?.comments"
      @click-input="openCommentBox"
      @toggle-like="handleLikeToggle"
      @toggle-fav="handleFavToggle"
      @click-comment="scrollToComment"
    />
  </div>
</template>

<style scoped>
.detail-page {
  padding-bottom: 56px;
}
</style>
