import express from 'express'
import { pool } from '../db.js'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// 获取所有标签
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tags ORDER BY sort_order ASC, id ASC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 批量更新标签（先删后插）
router.put('/', requireAdmin, async (req, res) => {
  const { tags } = req.body // [{name, sort_order}]
  try {
    await pool.query('DELETE FROM tags')
    if (tags && tags.length > 0) {
      const values = tags.map((t, i) => [t.name, t.sort_order || i + 1])
      await pool.query(
        'INSERT INTO tags (name, sort_order) VALUES ?',
        [values]
      )
    }
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
