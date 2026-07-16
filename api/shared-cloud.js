// Vercel API: Shared Cloud Inventory Store
// Public shared storage for inventory and audit data

const { createPool } = require('@vercel/postgres');

async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
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
    client = await pool.connect();

    if (req.method === 'GET') {
      const result = await client.query(
        'SELECT data FROM cloud_store WHERE store_key = $1',
        ['shared_inventory']
      );

      const record = result.rows[0];
      if (!record || !record.data) {
        return res.status(200).json({ success: true, data: { items: [], audit: [] } });
      }

      return res.status(200).json({ success: true, data: record.data });
    }

    if (req.method === 'PUT') {
      const { items, audit } = req.body;
      if (!Array.isArray(items) || !Array.isArray(audit)) {
        return res.status(400).json({ success: false, error: 'Invalid payload' });
      }

      await client.query(
        `INSERT INTO cloud_store (store_key, data, updated_at)
         VALUES ($1, $2, CURRENT_TIMESTAMP)
         ON CONFLICT (store_key)
         DO UPDATE SET data = $2, updated_at = CURRENT_TIMESTAMP`,
        ['shared_inventory', { items, audit }]
      );

      return res.status(200).json({ success: true });
    }

    res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    if (client) try { client.release(); } catch (e) {}
    res.status(500).json({ success: false, error: error.message });
  } finally {
    if (client) try { client.release(); } catch (e) {}
  }
}

module.exports = handler;
