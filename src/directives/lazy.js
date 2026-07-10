/**
 * 自定义图片懒加载指令 v-lazy
 */
export default {
  // mounted 是 Vue3 指令的生命周期：当被绑定的元素插入到 DOM 中时调用
  mounted(el, binding) {
    // 1. 准备一张默认占位图（或者是 base64 加载图）
    const placeholder = 'https://via.placeholder.com/300?text=Loading...'

    // 2. 先将真实的图片地址备份，把占位图给 src
    const realSrc = binding.value
    el.src = placeholder

    // 3. 实例化观察器
    const observer = new IntersectionObserver(
      (entries) => {
        // entries 是一个数组，包含了所有被观察的对象
        entries.forEach((entry) => {
          // isIntersecting 为 true 表示元素进入了视口
          if (entry.isIntersecting) {
            console.log('图片进入视口，开始加载真实地址:', realSrc)

            // 加载真实图片
            el.src = realSrc

            // 监听图片加载成功/失败（可选优化）
            el.onload = () => el.classList.add('fade-in')
            el.onerror = () => (el.src = 'https://via.placeholder.com/300?text=Error')

            // 4. 【关键】图片已经开始加载了，停止对该元素的观察，释放资源
            observer.unobserve(el)
          }
        })
      },
      {
        // 观察配置
        rootMargin: '0px 0px 200px 0px', // 预加载：在距离视口底部还有200px时就开始加载，用户无感知
        threshold: 0, // 交叉比例：只要有一点点进入视口就开始加载
      },
    )

    // 5. 开启观察当前 img 元素
    observer.observe(el)
  },
}
