import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

// 创建数据库连接池
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// 测试连接
async function testConnection() {
  try {
    const conn = await pool.getConnection()
    console.log('✅ MySQL 数据库连接成功')
    conn.release()
  } catch (err) {
    console.error('❌ MySQL 连接失败:', err.message)
    process.exit(1)
  }
}

export { pool, testConnection }
