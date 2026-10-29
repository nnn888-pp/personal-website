<template>
  <!-- 固定导航 -->
  <NavBar />

  <main>
    <HeroSection />
    <AboutSection />
    <WorksSection />
    <JourneySection />
  </main>

  <FooterSection />

  <!-- 返回顶部 -->
  <button class="back-top" id="backTop" aria-label="返回顶部" @click="scrollToTop">
    ↑
  </button>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import WorksSection from './components/WorksSection.vue'
import JourneySection from './components/JourneySection.vue'
import FooterSection from './components/FooterSection.vue'
import { setupReveal, setupScrollEffects } from './utils/reveal'

let cleanup = null

onMounted(() => {
  cleanup = setupReveal()
  setupScrollEffects()

  // 页脚年份自动更新
  const yearEl = document.getElementById('year')
  if (yearEl) yearEl.textContent = new Date().getFullYear()
})

onUnmounted(() => {
  if (cleanup) cleanup()
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
