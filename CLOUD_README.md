# ThreadCount — Cloud Inventory System

A Node.js serverless inventory management system deployed on **Vercel** with PostgreSQL backend.

## 🚀 Live Demo

Your app will be available at: `https://inventory-jain.vercel.app`

## 📋 Features

- ✅ **Cloud Database** — PostgreSQL on Vercel Postgres / Supabase
- ✅ **Serverless API** — Auto-scaling Vercel functions (Node.js)
- ✅ **JWT Authentication** — Secure token-based user login
- ✅ **Real-time Sync** — Instant updates across devices
- ✅ **Audit Trail** — Complete action history logging
- ✅ **Multi-user** — Admin & staff role-based access

## 🛠️ API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth` | Login/Signup/Verify Token |
| GET | `/api/inventory` | Get all items |
| POST | `/api/inventory` | Add new item |
| PUT | `/api/inventory` | Update item |
| DELETE | `/api/inventory?id=1` | Delete item |
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks` | Update task |
| DELETE | `/api/tasks?id=1` | Delete task |
| GET | `/api/audit-logs` | Get audit history |
| POST | `/api/setup?action=init-db` | Initialize database |

## 🔧 Setup

1. **Deploy to Vercel:**
   ```bash
   npm run deploy
   ```

2. **Set Environment Variables in Vercel Dashboard:**
   - `DATABASE_URL`: PostgreSQL connection string (postgresql://...)
   - `JWT_SECRET`: Random secret key (minimum 32 characters)

3. **Initialize Database:**
   ```bash
   curl https://your-app.vercel.app/api/setup?action=init-db
   ```

## 📱 Usage

```javascript
// Initialize API client
const api = new InventoryAPI('https://your-app.vercel.app');

// Login
await api.login('admin@example.com', 'password');

// Get inventory
const items = await api.getInventory();

// Add item
await api.addItem({
  item_name: 'New Item',
  quantity: 10,
  price: 99.99
});
```

## 🎯 Default Accounts

| Username | Password | Role |
|----------|----------|------|
| admin@jain.com | admin123 | Admin |
| staff@jain.com | staff123 | Staff |

## 📊 Database Schema

- `inventory` — Items with stock, price, tags
- `audit_logs` — Action history with timestamps
- `tasks` — Kanban board tasks
- `users` — Staff accounts with roles

## 🔒 Security

- JWT token authentication
- CORS enabled for web access
- Role-based permissions (Admin/Staff)
- All actions logged to audit trail

---

**Built with Vercel + PostgreSQL + JWT**