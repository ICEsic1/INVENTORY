# ThreadCount — Cloud Inventory System

A lightweight inventory dashboard with local session storage and optional Vercel/Postgres cloud sync.

## 🚀 Run Locally

```bash
npm install
npm run dev
```

## 📋 Features

- Inventory management using local storage
- Audit trail for all inventory changes
- Simple admin/staff login
- Optional cloud sync endpoint at `/api/shared-cloud`
- Database initialization via `/api/setup?action=init-db`

## 🏗️ Structure

```
├── index.html           # Frontend dashboard
├── api/
│   ├── shared-cloud.js  # Cloud sync endpoint
│   └── setup.js         # Database initialization
├── vercel.json          # Deployment config
└── package.json         # Dependencies
```

## ☁️ Cloud Setup

Add environment variables in Vercel:

- `DATABASE_URL`
- `JWT_SECRET`

Then initialize the database:

```bash
curl https://your-app.vercel.app/api/setup?action=init-db
```

## Notes

This repository has been cleaned to keep the working dashboard and cloud sync endpoint only.
