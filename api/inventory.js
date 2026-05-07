// Vercel API: Inventory Management
// CRUD operations for inventory items

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
      const result = await client.query('SELECT * FROM inventory ORDER BY created_at DESC');
      client.release();
      res.status(200).json({ success: true, items: result.rows });

    } else if (req.method === 'POST') {
      const { item_name, item_size, quantity, price, color_tag } = req.body;
      const result = await client.query(
        'INSERT INTO inventory (item_name, item_size, quantity, price, color_tag) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [item_name, item_size, quantity, price, color_tag || 'gray']
      );

      await client.query(
        'INSERT INTO audit_logs (action, item_id, user_email, action_details) VALUES ($1, $2, $3, $4)',
        ['CREATE', result.rows[0].id, user.email, `Added: ${item_name}`]
      );

      client.release();
      res.status(201).json({ success: true, item: result.rows[0] });

    } else if (req.method === 'PUT') {
      const { id, item_name, item_size, quantity, price, color_tag } = req.body;
      const result = await client.query(
        'UPDATE inventory SET item_name=$1, item_size=$2, quantity=$3, price=$4, color_tag=$5, updated_at=CURRENT_TIMESTAMP WHERE id=$6 RETURNING *',
        [item_name, item_size, quantity, price, color_tag, id]
      );

      await client.query(
        'INSERT INTO audit_logs (action, item_id, user_email, action_details) VALUES ($1, $2, $3, $4)',
        ['UPDATE', id, user.email, `Updated: ${item_name}`]
      );

      client.release();
      res.status(200).json({ success: true, item: result.rows[0] });

    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      const result = await client.query('SELECT item_name FROM inventory WHERE id=$1', [id]);
      await client.query('DELETE FROM inventory WHERE id=$1', [id]);

      await client.query(
        'INSERT INTO audit_logs (action, item_id, user_email, action_details) VALUES ($1, $2, $3, $4)',
        ['DELETE', id, user.email, `Deleted: ${result.rows[0]?.item_name || 'Unknown'}`]
      );

      client.release();
      res.status(200).json({ success: true, message: 'Item deleted' });

    } else {
      client.release();
      res.status(400).json({ success: false, error: 'Invalid method' });
    }

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
