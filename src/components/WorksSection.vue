<template>
  <section class="section section-alt" id="works">
    <div class="container">
      <div class="section-head reveal">
        <span class="section-no">02</span>
        <h2 class="section-title">作品集</h2>
        <span class="section-rule"></span>
        <span class="section-en">SELECTED&nbsp;WORKS</span>
      </div>
      <div class="works-grid">
        <article v-for="work in works" :key="work.id" class="card reveal">
          <div class="card-img">
            <img :src="work.image_url" :alt="work.title" loading="lazy" />
            <span class="card-no">{{ work.no }}</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">{{ work.title }}</h3>
            <p class="card-desc">{{ work.description }}</p>
            <div class="card-tags">
              <span v-for="tag in work.tags.split(',')" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

const works = ref([])

onMounted(async () => {
  try {
    const res = await api.get('/works')
    works.value = res.data
  } catch (e) {
    console.error('加载作品集失败', e)
  }
})
</script>
