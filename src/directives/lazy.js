/**
 * 自定义图片懒加载指令 v-lazy
 *
 * 基于 IntersectionObserver，图片进入视口前 200px 开始预加载。
 * 占位图和错误图均为内联 SVG，不依赖任何外部服务。
 */

// 内联 SVG 占位图：永远可用的灰色 Loading 背景
const placeholderSVG = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
    <rect width="300" height="300" fill="#f0f0f0"/>
    <text x="150" y="155" text-anchor="middle" font-size="14" fill="#999">Loading...</text>
  </svg>
`)
const PLACEHOLDER = `data:image/svg+xml,${placeholderSVG}`

// 内联 SVG 错误图：加载失败时的占位
const errorSVG = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
    <rect width="300" height="300" fill="#f5f5f5"/>
    <text x="150" y="150" text-anchor="middle" font-size="40" fill="#ccc">🖼</text>
    <text x="150" y="180" text-anchor="middle" font-size="12" fill="#bbb">图片加载失败</text>
  </svg>
`)
const ERROR_IMG = `data:image/svg+xml,${errorSVG}`

export default {
  // mounted 是 Vue3 指令的生命周期：当被绑定的元素插入到 DOM 中时调用
  mounted(el, binding) {
    // 1. 先将真实的图片地址备份，把占位图给 src
    const realSrc = binding.value
    el.src = PLACEHOLDER

    // 2. 实例化观察器
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 加载真实图片
            el.src = realSrc

            // 监听图片加载成功/失败
            el.onload = () => el.classList.add('fade-in')
            el.onerror = () => (el.src = ERROR_IMG)

            // 图片已开始加载，停止观察
            observer.unobserve(el)
          }
        })
      },
      {
        // 距离视口底部还有 200px 时就开始预加载
        rootMargin: '0px 0px 200px 0px',
        threshold: 0,
      },
    )

    // 3. 开启观察当前 img 元素
    observer.observe(el)
  },
}
