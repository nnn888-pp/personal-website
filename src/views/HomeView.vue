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
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import WorksSection from '../components/WorksSection.vue'
import JourneySection from '../components/JourneySection.vue'
import FooterSection from '../components/FooterSection.vue'
import { setupReveal, setupScrollEffects } from '../utils/reveal'

let cleanup = null

onMounted(() => {
  // 等待组件渲染后再观察
  setTimeout(() => {
    cleanup = setupReveal()
  }, 100)
  setupScrollEffects()
})

onUnmounted(() => {
  if (cleanup) cleanup()
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
