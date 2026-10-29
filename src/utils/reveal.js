// 滚动淡入：元素进入视口时添加 visible 类
export function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 }
  )

  // 首次观察
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

  // 返回清理函数
  return () => observer.disconnect()
}

// 导航栏滚动阴影 + 返回顶部按钮显隐
export function setupScrollEffects() {
  const nav = document.getElementById('nav')
  const backTop = document.getElementById('backTop')

  const onScroll = () => {
    const y = window.scrollY
    if (nav) nav.classList.toggle('scrolled', y > 10)
    if (backTop) backTop.classList.toggle('show', y > 400)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
}
