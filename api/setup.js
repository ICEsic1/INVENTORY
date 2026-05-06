const mysql = require('mysql2/promise');

export default async function handler(req, res) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      ssl: { rejectUnauthorized: false }
    });

    // This creates your inventory table automatically!
    await connection.query(`
      CREATE TABLE IF NOT EXISTS inventory (
        id INT AUTO_INCREMENT PRIMARY KEY,
        item_name VARCHAR(255) NOT NULL,
        item_size VARCHAR(50),
        quantity INT DEFAULT 0,
        price DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.end();
    res.status(200).json({ success: true, message: "Database table 'inventory' is ready!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
