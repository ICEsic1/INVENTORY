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

export default async function handler(req, res) {
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
    connectionString: process.env.DATABASE_URL
  });

  try {
    const client = await pool.connect();
    const limit = req.query.limit || 100;

    const result = await client.query(
      'SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT $1',
      [limit]
    );

    client.release();
    res.status(200).json({ success: true, logs: result.rows });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
