import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

// 登录验证：只验证密码，不修改任何数据
router.post('/login', (req, res) => {
  const { password } = req.body
  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true })
  } else {
    res.status(401).json({ error: '密码错误' })
  }
})

export default router
