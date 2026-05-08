# ThreadCount — Cloud Inventory System

A Node.js serverless inventory management system on Vercel with PostgreSQL.

## 🚀 Deploy to Cloud

```bash
npm run deploy
```

See [VERCEL_SETUP.md](VERCEL_SETUP.md) for complete deployment guide.

## 📋 Features

- **Inventory Management** — Add/edit/delete items with real-time tracking
- **Audit Logs** — Complete history of all actions
- **Task Management** — Kanban-style tasks with status tracking
- **JWT Authentication** — Secure role-based access (admin/staff)
- **Serverless** — Auto-scaling on Vercel with PostgreSQL

## 🏗️ Architecture

```
├── index.html           # Cloud UI
├── api/
│   ├── auth.js          # Login, signup, verify
│   ├── inventory.js     # Item management
│   ├── tasks.js         # Task management
│   ├── audit-logs.js    # Audit history
│   └── setup.js         # Database init
├── vercel.json          # Deployment config
└── package.json         # Dependencies
```

## 💾 Database

PostgreSQL with auto-initialized tables:
- `users` — User accounts
- `inventory` — Stock items
- `tasks` — Task board
- `audit_logs` — Action history

## 👥 Users

- **Admin** — Full system access
- **Staff** — Inventory and task management

---

**Deployment:** See [VERCEL_SETUP.md](VERCEL_SETUP.md) | **Live:** [inventory-jain.vercel.app](https://inventory-jain.vercel.app)
