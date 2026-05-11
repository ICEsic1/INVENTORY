// Vercel API: Audit Logs
// Retrieve audit history

const jwt = require('jsonwebtoken');
const { createPool } = require('@vercel/postgres');

const verifyToken = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return null;
  
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch (error) {
    return null;
  }
};

async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const user = verifyToken(req);
  if (!user) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(400).json({ success: false, error: 'Invalid method' });
  }

  const pool = createPool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  let client;
  try {
    client = await pool.connect();
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 100, 1), 1000);

  } catch (error) {
    if (client) try { client.release(); } catch (e) {}
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = handler;
