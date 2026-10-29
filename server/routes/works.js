import express from 'express'
import { pool } from '../db.js'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// 获取所有作品
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM works ORDER BY sort_order ASC, id ASC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 新增作品
router.post('/', requireAdmin, async (req, res) => {
  const { no, title, description, tags, image_url, sort_order } = req.body
  try {
    const [result] = await pool.query(
      'INSERT INTO works (no, title, description, tags, image_url, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
      [no, title, description, tags, image_url, sort_order || 0]
    )
    res.json({ success: true, id: result.insertId })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 更新作品
router.put('/:id', requireAdmin, async (req, res) => {
  const { id } = req.params
  const { no, title, description, tags, image_url, sort_order } = req.body
  try {
    await pool.query(
      'UPDATE works SET no=?, title=?, description=?, tags=?, image_url=?, sort_order=? WHERE id=?',
      [no, title, description, tags, image_url, sort_order || 0, id]
    )
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 删除作品
router.delete('/:id', requireAdmin, async (req, res) => {
  const { id } = req.params
  try {
    await pool.query('DELETE FROM works WHERE id = ?', [id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
