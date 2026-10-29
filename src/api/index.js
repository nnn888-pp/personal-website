import axios from 'axios'

// 创建 axios 实例
// 开发时走 Vite 代理到后端，生产时需要配置后端地址
const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器：自动携带管理密码（如果已登录）
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers['x-admin-password'] = token
  }
  return config
})

export default api
