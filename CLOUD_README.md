# ThreadCount — Cloud Inventory System

A Django-powered inventory management system deployed on **Vercel** with cloud database.

## 🚀 Live Demo

Your app will be available at: `https://inventory-jain.vercel.app`

## 📋 Features

- ✅ **Cloud Database** — PostgreSQL on Vercel/Supabase
- ✅ **Serverless API** — Auto-scaling Vercel functions
- ✅ **JWT Authentication** — Secure user login
- ✅ **Real-time Sync** — Instant updates across devices
- ✅ **Audit Trail** — All actions logged
- ✅ **Multi-user** — Admin & staff roles

## 🛠️ API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth` | Login/Signup |
| GET | `/api/inventory` | Get items |
| POST | `/api/inventory` | Add item |
| PUT | `/api/inventory` | Update item |
| DELETE | `/api/inventory?id=1` | Delete item |
| GET | `/api/tasks` | Get tasks |
| GET | `/api/audit-logs` | Get audit history |

## 🔧 Setup

1. **Deploy to Vercel:**
   ```bash
   ./deploy.bat
   ```

2. **Set Environment Variables:**
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: Random secret key (32+ chars)

3. **Initialize Database:**
   ```bash
   curl https://your-app.vercel.app/api/db-init
   ```

## 📱 Usage

```javascript
// Initialize API
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