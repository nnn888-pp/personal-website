import express from 'express'
import { pool } from '../db.js'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// 获取个人信息
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM profile WHERE id = 1')
    if (rows.length === 0) {
      return res.json({ nickname: '', slogan: '', intro: '', email: '', github: '' })
    }
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 更新个人信息
router.put('/', requireAdmin, async (req, res) => {
  const { nickname, slogan, intro, email, github } = req.body
  try {
    await pool.query(
      `UPDATE profile SET nickname=?, slogan=?, intro=?, email=?, github=? WHERE id=1`,
      [nickname, slogan, intro, email, github]
    )
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
