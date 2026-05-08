# ThreadCount — Clothing Inventory System

A Node.js cloud inventory management system deployed on Vercel with PostgreSQL backend.

## Quick Start

### Local Development
```bash
npm install
npm run dev
```

### Cloud Deployment
```bash
npm run deploy
```

Then open https://your-vercel-app.vercel.app

## Setup Requirements

1. **Environment Variables** (.env.local)
```
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
```

2. **Database** — PostgreSQL (auto-initialized on first request)

## Features
- **Inventory Management** — Add/edit/delete items with color tags, real-time quantity tracking
- **Audit History** — Complete audit logs for all actions with timestamp and user
- **Task Management** — Kanban-style task board with status tracking
- **User Authentication** — JWT-based auth with role-based access (admin/staff)
- **Cloud-Ready** — Deployed on Vercel with serverless API endpoints

## Architecture
```
├── index.html           # Single-page app frontend
├── api/
│   ├── auth.js          # Login, signup, token verification
│   ├── inventory.js     # CRUD for inventory items
│   ├── tasks.js         # CRUD for tasks
│   ├── audit-logs.js    # Audit trail retrieval
│   ├── db-init.js       # Database schema initialization
│   └── setup.js         # Configuration endpoints
├── vercel.json          # Vercel deployment config
└── package.json         # Dependencies and scripts
```

## Roles
- **Admin**: Full access to all features
- **Staff**: Can manage inventory and tasks

## Database Tables
- `users` — User accounts with hashed passwords
- `inventory` — Inventory items with tags
- `tasks` — Task management with status
- `audit_logs` — Complete action history
