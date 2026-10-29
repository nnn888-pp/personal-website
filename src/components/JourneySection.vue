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
        <li v-for="item in journey" :key="item.date + item.title" class="timeline-item reveal">
          <span class="timeline-date">{{ item.date }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
// 时间线数据：数组驱动渲染
const journey = [
  {
    date: '2026 · 秋',
    title: 'AI 大模型原理实操',
    desc: '手写 Tokenizer，完成 Transformer 预训练、监督微调与 LoRA 微调，跑通从语料到推理的全流程。'
  },
  {
    date: '2026 · 秋',
    title: '浏览器插件开发与发布',
    desc: '独立完成电商图片下载插件，搭建项目官网并发布至 GitHub Pages。'
  },
  {
    date: '2026 · 秋',
    title: '零代码与 AI 编程工具实操',
    desc: '多平台并行完成零代码应用生成与发布，实践 BYOK 方式配置自有模型。'
  },
  {
    date: '2026 · 秋',
    title: '项目开发与部署全流程',
    desc: '以文档驱动开发：PRD → 技术设计 → AGENTS.md → 编码 → 部署本站上线。'
  }
]
</script>
