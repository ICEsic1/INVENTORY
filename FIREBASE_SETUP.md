# Firebase Cloud Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a new project"**
3. Enter project name: `inventory-jain` (or your choice)
4. Enable Google Analytics (optional)
5. Click **Create**

## Step 2: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Select **Start in production mode**
4. Choose region closest to you
5. Click **Create**

## Step 3: Enable Authentication

1. Go to **Authentication** → **Get Started**
2. Enable **Email/Password** provider
3. (Optional) Enable **Google Sign-In**

## Step 4: Get Your Firebase Config

1. Go to **Project Settings** (⚙️ icon)
2. Copy your `firebaseConfig` object
3. Paste into [firebase-config.js](firebase-config.js), replacing:
   - `YOUR_API_KEY`
   - `YOUR_PROJECT` 
   - `YOUR_PROJECT_ID`
   - `YOUR_MESSAGING_SENDER_ID`
   - `YOUR_APP_ID`

## Step 5: Update Environment Variables

Add these to your `.env` file:

```env
FIREBASE_API_KEY=YOUR_API_KEY
FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
FIREBASE_APP_ID=YOUR_APP_ID

# For backend admin operations
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"YOUR_PROJECT_ID",...}
```

## Step 6: Install Firebase SDK

```bash
npm install firebase firebase-admin
```

## Step 7: Initialize Firestore Collections

Call the migration endpoint:

```bash
curl http://localhost:8000/api/firebase-setup
```

## Step 8: Migrate Existing Data (Optional)

If you have existing MySQL data, run:

```bash
curl http://localhost:8000/api/migration
```

This will copy all inventory items, audit logs, and tasks to Firebase Firestore.

## Step 9: Update HTML

Include Firebase SDK in `index.html`:

```html
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"></script>
<script src="./firebase-config.js"></script>
<script src="./firebase-auth.js"></script>
<script src="./firebase-sync.js"></script>
```

## Features Enabled

✅ **Cloud Authentication** — Users login via Firebase Auth  
✅ **Cloud Database** — Firestore stores all inventory, tasks, audit logs  
✅ **Real-time Sync** — All clients see updates instantly  
✅ **Automatic Backups** — Firebase handles daily backups  
✅ **Multi-device Access** — Access from anywhere with internet  
✅ **Audit History** — All changes logged with timestamp & user  

## Testing

**Test Login:**
```javascript
import { loginUser } from './firebase-auth.js';
await loginUser('test@example.com', 'password123');
```

**Test Real-time Sync:**
```javascript
import { syncInventory } from './firebase-sync.js';
syncInventory((items) => {
  console.log('Updated items:', items);
});
```

**Add Test Item:**
```javascript
import { addInventoryItem } from './firebase-sync.js';
await addInventoryItem({
  item_name: 'Test Item',
  item_size: 'M',
  quantity: 10,
  price: 99.99,
  color_tag: 'gold'
});
```

## Security Rules

After testing, update Firestore Security Rules (go to **Firestore** → **Rules**):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Require authentication for all operations
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Admin-only operations
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId || 
                           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Troubleshooting

**"Firebase is not defined"** → Ensure Firebase SDK is loaded before config.js

**"Permission denied" errors** → Check Security Rules match your auth setup

**Real-time updates not working** → Verify Firestore database is in production mode

**High billing** → Check if you have unused indexes; delete if needed
