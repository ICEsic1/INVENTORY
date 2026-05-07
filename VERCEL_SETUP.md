# Vercel Cloud Deployment Guide

## 🚀 Quick Deploy (Recommended)

**Since CLI authentication is tricky, let's deploy via GitHub:**

### Step 1: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/inventory-jain.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo: `inventory-jain`
3. Vercel will auto-detect the settings
4. Click **Deploy**

### Step 3: Set Environment Variables
In Vercel Dashboard → Your Project → Settings → Environment Variables:

```
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-super-secret-jwt-key-here
```

### Step 4: Initialize Database
After deployment, call:
```
curl https://your-app.vercel.app/api/db-init
```

---

## Overview

This guide deploys your inventory system to **Vercel** with a cloud PostgreSQL database. Everything is serverless and scales automatically.

## Prerequisites

- Vercel account (free at [vercel.com](https://vercel.com))
- GitHub account (for easy Vercel integration)
- Database: Vercel Postgres, Supabase, or PlanetScale

---

## Step 1: Choose Your Database

### Option A: Vercel Postgres (Recommended)
1. Sign in to [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to **Storage** → **Create** → **Postgres**
3. Name it: `inventory-jain-db`
4. Select region closest to you
5. Copy the connection string

### Option B: Supabase (Free PostgreSQL)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to **Settings** → **Database** → copy connection string
4. Supports unlimited free tier with API

### Option C: PlanetScale (Free MySQL)
1. Go to [planetscale.com](https://planetscale.com)
2. Create new database
3. Get connection string from **Overview**

---

## Step 2: Set Up Environment Variables

### Create `.env.local` (for local testing):

```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-jwt-key-here-min-32-chars
NODE_ENV=production
```

### Add to Vercel:

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add each variable:
   - `DATABASE_URL`: Your database connection string
   - `JWT_SECRET`: A strong random string (min 32 characters)

---

## Step 3: Install Dependencies

```bash
npm install jsonwebtoken bcryptjs @vercel/postgres dotenv
```

---

## Step 4: Initialize Database

Deploy the initialization function:

```bash
vercel deploy
```

Then call the init endpoint:

```bash
curl https://your-vercel-app.vercel.app/api/db-init
```

Or add this to your `index.html` after login:

```javascript
fetch('https://your-vercel-app.vercel.app/api/db-init', { method: 'GET' });
```

---

## Step 5: Update Your HTML

Add this to `index.html` in the `<head>`:

```html
<!-- Vercel API Client -->
<script src="./vercel-api-client.js"></script>

<script>
  // Initialize API with your Vercel deployment URL
  const api = new InventoryAPI('https://your-vercel-app.vercel.app');

  // Example: Login
  async function handleLogin(email, password) {
    const result = await api.login(email, password);
    if (result.success) {
      console.log('Logged in:', result.user);
      loadInventory();
    } else {
      alert(result.error);
    }
  }

  // Example: Load inventory
  async function loadInventory() {
    const result = await api.getInventory();
    if (result.success) {
      console.log('Items:', result.items);
      // Update your UI here
    }
  }

  // Example: Add item
  async function addNewItem() {
    const result = await api.addItem({
      item_name: 'New Item',
      item_size: 'M',
      quantity: 10,
      price: 99.99,
      color_tag: 'gold'
    });
    console.log(result);
  }
</script>
```

---

## Step 6: Deploy to Vercel

### Option A: Via Git (Recommended)

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial inventory system with Vercel"
git push -u origin main
```

2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Add environment variables
5. Click **Deploy** ✅

### Option B: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

---

## Step 7: Test Your API

### Test Login:
```bash
curl -X POST https://your-vercel-app.vercel.app/api/auth \
  -H "Content-Type: application/json" \
  -d '{"action":"signup","email":"test@example.com","password":"password123"}'
```

### Test Get Inventory:
```bash
curl -X GET https://your-vercel-app.vercel.app/api/inventory \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test Add Item:
```bash
curl -X POST https://your-vercel-app.vercel.app/api/inventory \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"item_name":"Test","item_size":"M","quantity":5,"price":49.99}'
```

---

## File Structure

```
inventory-jain/
├── api/
│   ├── auth.js              # Login/signup
│   ├── inventory.js         # CRUD inventory
│   ├── tasks.js             # CRUD tasks
│   ├── audit-logs.js        # Get audit logs
│   └── db-init.js           # Initialize database
├── vercel.json              # Vercel config
├── vercel-api-client.js     # Client-side API wrapper
├── index.html               # Main UI
└── package.json             # Dependencies
```

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth` | Login/Signup (action: login, signup, verify) |
| GET | `/api/inventory` | Get all items |
| POST | `/api/inventory` | Add new item |
| PUT | `/api/inventory` | Update item |
| DELETE | `/api/inventory?id=1` | Delete item |
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Add new task |
| PUT | `/api/tasks` | Update task |
| DELETE | `/api/tasks?id=1` | Delete task |
| GET | `/api/audit-logs` | Get audit history |

---

## Features Enabled

✅ **Cloud Deployment** — Runs on Vercel's global CDN  
✅ **Serverless Functions** — API endpoints auto-scale  
✅ **Cloud Database** — PostgreSQL in the cloud  
✅ **JWT Authentication** — Secure token-based auth  
✅ **Audit Logging** — All actions tracked  
✅ **Multi-device** — Access from anywhere  
✅ **Real-time** — Instant updates  
✅ **Free Tier Available** — Generous free limits  

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Secret for signing tokens | `your-32-char-random-secret-key` |
| `NODE_ENV` | Environment mode | `production` |

---

## Troubleshooting

### "DATABASE_URL is not defined"
→ Add it to **Vercel Settings** → **Environment Variables**

### "Unauthorized" errors
→ Ensure token is passed in `Authorization: Bearer <token>` header

### Database connection fails
→ Check connection string format: `postgresql://user:pass@host:5432/db`

### Functions timeout
→ Increase timeout in `vercel.json` if needed (default 60s)

### CORS errors
→ All endpoints have CORS enabled, but check browser console for exact error

---

## Going Live

1. Set up custom domain in Vercel Settings
2. Enable auto-deployments from GitHub
3. Set up monitoring/alerts in Vercel Analytics
4. Back up database regularly (set up Vercel backup schedules)

Your inventory system is now live on the cloud! 🚀
