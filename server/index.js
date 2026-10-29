import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { testConnection } from './db.js'
import profileRoutes from './routes/profile.js'
import tagsRoutes from './routes/tags.js'
import worksRoutes from './routes/works.js'
import journeyRoutes from './routes/journey.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// 中间件
app.use(cors())
app.use(express.json())

// 测试数据库连接
testConnection()

// 路由
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/tags', tagsRoutes)
app.use('/api/works', worksRoutes)
app.use('/api/journey', journeyRoutes)

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 后端服务运行在 http://localhost:${PORT}`)
})
