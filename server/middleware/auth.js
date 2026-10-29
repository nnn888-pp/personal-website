import dotenv from 'dotenv'
dotenv.config()

// 简单密码验证中间件
// 管理操作需要在请求头中携带 x-admin-password
export function requireAdmin(req, res, next) {
  const password = req.headers['x-admin-password']
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: '管理员密码错误' })
  }
  next()
}
