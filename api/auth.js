// Vercel API: Authentication Handler
// Login, signup, logout with JWT tokens

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createPool } = require('@vercel/postgres');

async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const pool = createPool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  let client;
  try {
    const { action, email, password, role } = req.body;
    client = await pool.connect();

    if (action === 'signup') {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await client.query(
        'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role',
        [email, hashedPassword, role || 'staff']
      );

      const token = jwt.sign(
        { id: result.rows[0].id, email: result.rows[0].email, role: result.rows[0].role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '30d' }
      );

      client.release();
      res.status(201).json({ 
        success: true, 
        message: 'User created successfully',
        token,
        user: result.rows[0]
      });

    } else if (action === 'login') {
      const result = await client.query(
        'SELECT id, email, role, password_hash FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        client.release();
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      const user = result.rows[0];
      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        client.release();
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '30d' }
      );

      client.release();
      res.status(200).json({ 
        success: true, 
        message: 'Logged in successfully',
        token,
        user: { id: user.id, email: user.email, role: user.role }
      });

    } else if (action === 'verify') {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        client.release();
        return res.status(401).json({ success: false, error: 'No token provided' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      client.release();
      res.status(200).json({ success: true, user: decoded });

    } else {
      client.release();
      res.status(400).json({ success: false, error: 'Invalid action' });
    }

  } catch (error) {
    try {
      await client.release();
    } catch (e) {
      // client may have already been released
    }
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = handler;
