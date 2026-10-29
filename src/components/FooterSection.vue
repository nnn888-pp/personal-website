<template>
  <footer class="footer" id="contact">
    <div class="container footer-inner reveal">
      <div class="seal seal-footer">{{ profile.nickname || '小萍' }}</div>
      <h2 class="footer-title">保持联系</h2>
      <p class="footer-sub">对这个网站或我的作品感兴趣？欢迎写信给我。</p>
      <div class="footer-links">
        <a class="btn btn-primary" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        <a
          class="btn btn-ghost"
          :href="profile.github"
          target="_blank"
          rel="noopener"
          >GitHub</a
        >
      </div>
      <p class="footer-copy">© <span id="year">{{ year }}</span> {{ profile.nickname || '小萍' }} · 手工打磨，无模板</p>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

const profile = ref({ nickname: '', email: '', github: '' })
const year = new Date().getFullYear()

onMounted(async () => {
  try {
    const res = await api.get('/profile')
    profile.value = res.data
  } catch (e) {
    console.error('加载页脚信息失败', e)
  }
})
</script>
