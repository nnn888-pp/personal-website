import express from 'express'
import { pool } from '../db.js'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// 获取所有经历
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM journey ORDER BY sort_order ASC, id ASC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 新增经历
router.post('/', requireAdmin, async (req, res) => {
  const { date_label, title, description, sort_order } = req.body
  try {
    const [result] = await pool.query(
      'INSERT INTO journey (date_label, title, description, sort_order) VALUES (?, ?, ?, ?)',
      [date_label, title, description, sort_order || 0]
    )
    res.json({ success: true, id: result.insertId })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 更新经历
router.put('/:id', requireAdmin, async (req, res) => {
  const { id } = req.params
  const { date_label, title, description, sort_order } = req.body
  try {
    await pool.query(
      'UPDATE journey SET date_label=?, title=?, description=?, sort_order=? WHERE id=?',
      [date_label, title, description, sort_order || 0, id]
    )
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 删除经历
router.delete('/:id', requireAdmin, async (req, res) => {
  const { id } = req.params
  try {
    await pool.query('DELETE FROM journey WHERE id = ?', [id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
