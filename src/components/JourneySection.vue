<template>
  <section class="section" id="journey">
    <div class="container">
      <div class="section-head reveal">
        <span class="section-no">03</span>
        <h2 class="section-title">学习经历</h2>
        <span class="section-rule"></span>
        <span class="section-en">JOURNEY</span>
      </div>
      <ol class="timeline">
        <li v-for="item in journey" :key="item.id" class="timeline-item reveal">
          <span class="timeline-date">{{ item.date_label }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

const journey = ref([])

onMounted(async () => {
  try {
    const res = await api.get('/journey')
    journey.value = res.data
  } catch (e) {
    console.error('加载学习经历失败', e)
  }
})
</script>
