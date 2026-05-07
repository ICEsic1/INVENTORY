// Vercel API: Tasks Management
// CRUD operations for Kanban tasks

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const user = verifyToken(req);
  if (!user) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const pool = createPool({
    connectionString: process.env.DATABASE_URL
  });

  try {
    const client = await pool.connect();

    if (req.method === 'GET') {
      const result = await client.query('SELECT * FROM tasks ORDER BY created_at DESC');
      client.release();
      res.status(200).json({ success: true, tasks: result.rows });

    } else if (req.method === 'POST') {
      const { title, description, status, assigned_to } = req.body;
      const result = await client.query(
        'INSERT INTO tasks (title, description, status, assigned_to) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, description, status || 'pending', assigned_to]
      );

      client.release();
      res.status(201).json({ success: true, task: result.rows[0] });

    } else if (req.method === 'PUT') {
      const { id, title, description, status, assigned_to } = req.body;
      const result = await client.query(
        'UPDATE tasks SET title=$1, description=$2, status=$3, assigned_to=$4, updated_at=CURRENT_TIMESTAMP WHERE id=$5 RETURNING *',
        [title, description, status, assigned_to, id]
      );

      client.release();
      res.status(200).json({ success: true, task: result.rows[0] });

    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      await client.query('DELETE FROM tasks WHERE id=$1', [id]);
      client.release();
      res.status(200).json({ success: true, message: 'Task deleted' });

    } else {
      client.release();
      res.status(400).json({ success: false, error: 'Invalid method' });
    }

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
