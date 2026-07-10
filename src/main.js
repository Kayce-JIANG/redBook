import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // ./同级 ../上一级 @/根目录（src）
import { createPinia } from 'pinia'
import '@/assets/css/common.css'
import '@/assets/css/index.css'
import '@/assets/font/iconfont.css'
import './assets/tailwind.css'
// 1. 引入 Element Plus 库
import ElementPlus from 'element-plus'
// 2. 引入 Element Plus 的样式文件（没这行的话，组件会没有样式，巨丑）
import 'element-plus/dist/index.css'
import vLazy from './directives/lazy'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 3. 全局注册 Element Plus
app.use(ElementPlus)
// 注册全局指令 v-lazy
app.directive('lazy', vLazy)
app.mount('#app')
