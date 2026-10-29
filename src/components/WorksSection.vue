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
        <article v-for="work in works" :key="work.no" class="card reveal">
          <div class="card-img">
            <img :src="work.img" :alt="work.title" loading="lazy" />
            <span class="card-no">{{ work.no }}</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">{{ work.title }}</h3>
            <p class="card-desc">{{ work.desc }}</p>
            <div class="card-tags">
              <span v-for="tag in work.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
// 作品集数据：用数组驱动渲染，体现 Vue 数据驱动视图的特性
const works = [
  {
    no: '壹',
    title: 'AI 大模型预训练与微调',
    desc: '自有 Tokenizer + Transformer 从零实现自回归预训练，完成监督微调与 LoRA 低秩微调全流程实操。',
    tags: ['Python', 'Transformer', 'LoRA'],
    img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20ink%20illustration%20of%20a%20neural%20network%20transformer%20architecture%2C%20hand-drawn%20nodes%20and%20connecting%20lines%20on%20aged%20paper%2C%20red%20seal%20accent%2C%20retro%20magazine%20style%2C%20minimalist&image_size=landscape_4_3'
  },
  {
    no: '贰',
    title: '电商图片下载插件',
    desc: '浏览器图片批量抓取插件，配套独立官网并通过 GitHub Pages 发布，提供一键下载。',
    tags: ['浏览器插件', 'JavaScript', 'GitHub Pages'],
    img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20magazine%20illustration%20of%20a%20browser%20extension%20grabbing%20photos%20from%20a%20webpage%2C%20ink%20drawing%20on%20old%20paper%2C%20cinnabar%20red%20accents%2C%20retro%20print%20style&image_size=landscape_4_3'
  },
  {
    no: '叁',
    title: '零代码单页应用',
    desc: '纯前端 localStorage 单页应用，无后端无登录，一键发布公开域名并稳定访问。',
    tags: ['零代码', 'localStorage', '单页应用'],
    img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20ink%20illustration%20of%20a%20single-page%20web%20app%20on%20paper%2C%20hand-drawn%20UI%20wireframe%20with%20red%20annotations%2C%20retro%20magazine%20print%20style%2C%20aged%20paper%20texture&image_size=landscape_4_3'
  },
  {
    no: '肆',
    title: '本网站本身',
    desc: '从 PRD、技术设计文档到 AGENTS.md 规范，再由 AI 辅助编码、Git 管理并部署上线的完整实践。',
    tags: ['AI 辅助开发', 'PRD 驱动', 'Cloudflare Pages'],
    img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20printing%20press%20and%20magazine%20layout%20ink%20illustration%2C%20hand-drawn%20on%20aged%20paper%2C%20cinnabar%20red%20seal%20stamp%2C%20retro%20editorial%20style&image_size=landscape_4_3'
  }
]
</script>
