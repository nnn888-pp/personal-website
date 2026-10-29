<template>
  <section class="section" id="about">
    <div class="container">
      <div class="section-head reveal">
        <span class="section-no">01</span>
        <h2 class="section-title">关于我</h2>
        <span class="section-rule"></span>
        <span class="section-en">ABOUT&nbsp;ME</span>
      </div>
      <div class="about-grid reveal">
        <p class="about-intro">{{ intro }}</p>
        <div class="about-tags">
          <span v-for="tag in tags" :key="tag.id" class="tag">{{ tag.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../api'

const profile = ref({ intro: '' })
const tags = ref([])

onMounted(async () => {
  try {
    const [profileRes, tagsRes] = await Promise.all([
      api.get('/profile'),
      api.get('/tags')
    ])
    profile.value = profileRes.data
    tags.value = tagsRes.data
  } catch (e) {
    console.error('加载关于我失败', e)
  }
})

const intro = computed(() => profile.value.intro || '')
</script>
