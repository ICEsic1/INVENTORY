# ThreadCount — Cloud Inventory System

A Node.js serverless inventory management system deployed on **Vercel** with PostgreSQL backend.

**Your cloud app:** `https://inventory-jain.vercel.app`

## 📋 Features

- **Cloud Database** — PostgreSQL on Vercel Postgres
- **Serverless API** — Auto-scaling Vercel functions
- **JWT Authentication** — Secure token-based access
- **Real-time Sync** — Instant updates across devices
- **Audit Trail** — Complete action history
- **Multi-user** — Admin & staff roles

## 🔧 Quick Setup (5 minutes)

### 1. Deploy to Vercel
```bash
npm run deploy
```

### 2. Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
```
DATABASE_URL=postgresql://user:password@host:5432/db
JWT_SECRET=your-random-secret-key-32-chars-minimum
```

### 3. Initialize Database
```bash
curl https://inventory-jain.vercel.app/api/setup?action=init-db
```

**Done!** Your cloud system is live.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth` | Login/Signup/Verify |
| GET/POST/PUT/DELETE | `/api/inventory` | Manage items |
| GET/POST/PUT/DELETE | `/api/tasks` | Manage tasks |
| GET | `/api/audit-logs` | View history |

## 👥 Default Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@jain.com | admin123 | Admin |
| staff@jain.com | staff123 | Staff |

## 🛡️ Security

- JWT token authentication
- Role-based access control
- Complete audit logging
- CORS enabled for cloud access

---

**Deployment:** Vercel | **Database:** PostgreSQL | **Auth:** JWT