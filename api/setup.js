// Vercel API: Setup and Configuration
// System initialization and configuration endpoints

const { createPool } = require('@vercel/postgres');

async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Return system status
    return res.status(200).json({ 
      success: true, 
      message: 'ThreadCount Inventory System is running',
      version: '1.0.0'
    });
  }

  if (req.method === 'POST' && req.query.action === 'init-db') {
    // Initialize database tables
    try {
      const pool = createPool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      });
      let client = await pool.connect();

      // Create tables
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255),
          role VARCHAR(50) DEFAULT 'staff',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          status VARCHAR(50) DEFAULT 'active'
        )
      `);

      await client.query(`
        CREATE TABLE IF NOT EXISTS inventory (
          id SERIAL PRIMARY KEY,
          item_name VARCHAR(255) NOT NULL,
          item_size VARCHAR(50),
          quantity INT DEFAULT 0,
          price DECIMAL(10, 2),
          color_tag VARCHAR(50) DEFAULT 'gray',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await client.query(`
        CREATE TABLE IF NOT EXISTS audit_logs (
          id SERIAL PRIMARY KEY,
          action VARCHAR(50) NOT NULL,
          item_id INT,
          user_email VARCHAR(255),
          action_details TEXT,
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await client.query(`
        CREATE TABLE IF NOT EXISTS tasks (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          status VARCHAR(50) DEFAULT 'pending',
          assigned_to VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      client.release();

      return res.status(200).json({ 
        success: true, 
        message: 'Database initialized successfully'
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  res.status(400).json({ success: false, error: 'Invalid request' });
}

module.exports = handler;
