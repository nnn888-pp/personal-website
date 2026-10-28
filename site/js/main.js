// 小萍 · 个人作品集 交互脚本

// 滚动淡入：元素进入视口时添加 visible 类
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// 导航栏滚动阴影 + 返回顶部按钮显隐
const nav = document.getElementById('nav');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 10);
  backTop.classList.toggle('show', y > 400);
}, { passive: true });

// 返回顶部
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 页脚年份自动更新
document.getElementById('year').textContent = new Date().getFullYear();
