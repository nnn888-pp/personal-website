<template>
  <div class="admin-page">
    <!-- 未登录：输入密码 -->
    <div v-if="!isLoggedIn" class="admin-login">
      <h1>管理后台</h1>
      <p>请输入管理员密码</p>
      <input v-model="password" type="password" placeholder="管理员密码" @keyup.enter="login" />
      <button class="btn btn-primary" @click="login">登录</button>
      <p v-if="loginError" class="error">{{ loginError }}</p>
      <p><router-link to="/">← 返回首页</router-link></p>
    </div>

    <!-- 已登录：编辑表单 -->
    <div v-else class="admin-content">
      <div class="admin-header">
        <h1>管理后台</h1>
        <div class="admin-actions">
          <button class="btn btn-ghost" @click="logout">退出</button>
          <router-link to="/" class="btn btn-ghost">查看首页</router-link>
        </div>
      </div>

      <!-- 个人信息 -->
      <section class="admin-section">
        <h2>个人信息</h2>
        <div class="form-group">
          <label>昵称</label>
          <input v-model="form.profile.nickname" />
        </div>
        <div class="form-group">
          <label>一句话标语</label>
          <input v-model="form.profile.slogan" />
        </div>
        <div class="form-group">
          <label>个人简介</label>
          <textarea v-model="form.profile.intro" rows="5"></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>邮箱</label>
            <input v-model="form.profile.email" />
          </div>
          <div class="form-group">
            <label>GitHub 链接</label>
            <input v-model="form.profile.github" />
          </div>
        </div>
        <button class="btn btn-primary" @click="saveProfile">保存个人信息</button>
      </section>

      <!-- 技能标签 -->
      <section class="admin-section">
        <h2>技能标签</h2>
        <div class="tag-editor">
          <div v-for="(tag, i) in form.tags" :key="i" class="tag-item">
            <input v-model="tag.name" placeholder="标签名" />
            <button class="btn-del" @click="form.tags.splice(i, 1)">×</button>
          </div>
          <button class="btn btn-ghost" @click="form.tags.push({ name: '', sort_order: 0 })">+ 添加标签</button>
        </div>
        <button class="btn btn-primary" @click="saveTags">保存标签</button>
      </section>

      <!-- 作品集 -->
      <section class="admin-section">
        <h2>作品集</h2>
        <div v-for="(work, i) in form.works" :key="work.id || 'new' + i" class="work-editor">
          <div class="form-row">
            <div class="form-group">
              <label>序号（壹贰叁肆）</label>
              <input v-model="work.no" style="width: 80px" />
            </div>
            <div class="form-group" style="flex: 1">
              <label>标题</label>
              <input v-model="work.title" />
            </div>
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea v-model="work.description" rows="2"></textarea>
          </div>
          <div class="form-group">
            <label>技术栈标签（逗号分隔）</label>
            <input v-model="work.tags" />
          </div>
          <div class="form-group">
            <label>图片 URL</label>
            <input v-model="work.image_url" />
          </div>
          <button class="btn-del" @click="form.works.splice(i, 1)">删除此作品</button>
        </div>
        <button class="btn btn-ghost" @click="addWork">+ 添加作品</button>
        <button class="btn btn-primary" @click="saveWorks">保存作品集</button>
      </section>

      <!-- 学习经历 -->
      <section class="admin-section">
        <h2>学习经历</h2>
        <div v-for="(item, i) in form.journey" :key="item.id || 'new' + i" class="journey-editor">
          <div class="form-row">
            <div class="form-group">
              <label>时间</label>
              <input v-model="item.date_label" />
            </div>
            <div class="form-group" style="flex: 1">
              <label>标题</label>
              <input v-model="item.title" />
            </div>
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea v-model="item.description" rows="2"></textarea>
          </div>
          <button class="btn-del" @click="form.journey.splice(i, 1)">删除此经历</button>
        </div>
        <button class="btn btn-ghost" @click="addJourney">+ 添加经历</button>
        <button class="btn btn-primary" @click="saveJourney">保存经历</button>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const router = useRouter()
const isLoggedIn = ref(false)
const password = ref('')
const loginError = ref('')

const form = reactive({
  profile: { nickname: '', slogan: '', intro: '', email: '', github: '' },
  tags: [],
  works: [],
  journey: []
})

// 检查登录状态
onMounted(() => {
  if (localStorage.getItem('admin_token')) {
    isLoggedIn.value = true
    loadAll()
  }
})

function login() {
  api.post('/auth/login', { password: password.value })
    .then(() => {
      localStorage.setItem('admin_token', password.value)
      isLoggedIn.value = true
      loginError.value = ''
      loadAll()
    })
    .catch(() => {
      loginError.value = '密码错误'
    })
}

function logout() {
  localStorage.removeItem('admin_token')
  isLoggedIn.value = false
  password.value = ''
}

async function loadAll() {
  try {
    const [p, t, w, j] = await Promise.all([
      api.get('/profile'),
      api.get('/tags'),
      api.get('/works'),
      api.get('/journey')
    ])
    form.profile = { ...p.data }
    form.tags = t.data.map(x => ({ name: x.name, sort_order: x.sort_order }))
    form.works = w.data.map(x => ({ ...x }))
    form.journey = j.data.map(x => ({ ...x }))
  } catch (e) {
    console.error('加载数据失败', e)
  }
}

async function saveProfile() {
  try {
    await api.put('/profile', form.profile)
    alert('个人信息已保存')
  } catch (e) {
    alert('保存失败：' + e.response?.data?.error)
  }
}

async function saveTags() {
  try {
    await api.put('/tags', { tags: form.tags })
    alert('标签已保存')
  } catch (e) {
    alert('保存失败：' + e.response?.data?.error)
  }
}

async function saveWorks() {
  try {
    // 简化处理：全部删除再重新插入（逐个更新太复杂）
    // 先删除所有旧作品
    const oldWorks = await api.get('/works')
    for (const w of oldWorks.data) {
      await api.delete(`/works/${w.id}`)
    }
    // 重新插入
    for (const w of form.works) {
      await api.post('/works', w)
    }
    alert('作品集已保存')
    loadAll()
  } catch (e) {
    alert('保存失败：' + e.response?.data?.error)
  }
}

async function saveJourney() {
  try {
    const oldJourney = await api.get('/journey')
    for (const j of oldJourney.data) {
      await api.delete(`/journey/${j.id}`)
    }
    for (const j of form.journey) {
      await api.post('/journey', j)
    }
    alert('经历已保存')
    loadAll()
  } catch (e) {
    alert('保存失败：' + e.response?.data?.error)
  }
}

function addWork() {
  form.works.push({ no: '', title: '', description: '', tags: '', image_url: '', sort_order: form.works.length + 1 })
}

function addJourney() {
  form.journey.push({ date_label: '', title: '', description: '', sort_order: form.journey.length + 1 })
}
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  padding: 80px 24px 40px;
  font-family: var(--serif);
}
.admin-login {
  max-width: 400px;
  margin: 100px auto;
  text-align: center;
}
.admin-login h1 { font-size: 32px; margin-bottom: 16px; }
.admin-login input {
  width: 100%;
  padding: 12px 16px;
  margin: 16px 0;
  border: 1px solid var(--hairline);
  background: var(--paper);
  font-size: 16px;
  font-family: inherit;
}
.error { color: var(--cinnabar); margin-top: 8px; }
.admin-content { max-width: 900px; margin: 0 auto; }
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--hairline);
}
.admin-header h1 { font-size: 28px; }
.admin-actions { display: flex; gap: 12px; }
.admin-section {
  background: var(--paper-deep);
  border: 1px solid var(--hairline);
  padding: 24px;
  margin-bottom: 24px;
}
.admin-section h2 {
  font-size: 20px;
  margin-bottom: 16px;
  color: var(--cinnabar);
}
.form-group { margin-bottom: 16px; }
.form-group label {
  display: block;
  font-size: 14px;
  color: var(--ochre);
  margin-bottom: 6px;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--hairline);
  background: var(--paper);
  font-size: 14px;
  font-family: inherit;
  color: var(--ink);
}
.form-row { display: flex; gap: 16px; }
.tag-editor { margin-bottom: 16px; }
.tag-item { display: flex; gap: 8px; margin-bottom: 8px; }
.tag-item input { flex: 1; padding: 6px 12px; border: 1px solid var(--hairline); background: var(--paper); }
.work-editor, .journey-editor {
  background: var(--paper);
  border: 1px solid var(--hairline);
  padding: 16px;
  margin-bottom: 16px;
}
.btn-del {
  background: transparent;
  border: 1px solid var(--cinnabar);
  color: var(--cinnabar);
  padding: 6px 16px;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  margin-top: 8px;
}
.btn-del:hover { background: var(--cinnabar); color: var(--paper); }
</style>
