👕 Clothing Inventory Manager
A lightweight, mobile-responsive inventory tracking system designed specifically for clothing stock. This tool allows you to manage stock levels, visualize low-inventory alerts, and export data for accounting—all from your smartphone or desktop.

🚀 Features
Mobile-First Design: Large, tap-friendly buttons for fast stock adjustments on the go.

Dynamic Visual Alerts:

🟢 Green: Stock is healthy (above threshold).

🔴 Red: Low stock alert (at or below threshold).

Instant Adjustments: Quick + and - buttons to update inventory without opening complex menus.

Excel Export: Download your entire inventory into a .xlsx file with one click for easy reporting.

Search & Filter: Quickly find specific items or sizes.

🛠️ Tech Stack
Frontend: HTML5, Tailwind CSS (for modern styling).

Logic: Vanilla JavaScript.

Export Engine: SheetJS (to handle Excel file generation).

Icons: Lucide Icons / Heroicons.

📲 How to Use on Mobile
Open the Link: Access your published URL (e.g., via GitHub Pages).

Add to Home Screen:

iPhone (Safari): Tap the Share icon (square with arrow) and select "Add to Home Screen."

Android (Chrome): Tap the three dots menu and select "Install App" or "Add to Home Screen."

Manage Stock: Use it just like a native app to tap and update your inventory as you sell or receive items.

⚙️ Configuration
To customize your inventory list, open the index.html file and locate the initialData array. You can pre-fill your items here:

JavaScript
{
  id: 1,
  name: "Vintage Graphic Tee",
  size: "M",
  stock: 25,
  threshold: 5 // Becomes RED when stock hits 5
}
📥 Local Setup & Deployment
Clone the Repo:

Bash
git clone https://github.com/your-username/clothing-inventory.git
Run Locally: Simply double-click the index.html file to open it in any browser.

Publish for Free:

Upload the index.html to GitHub Pages or Netlify.

No backend or database setup is required for this standalone version.

Note: This version stores data in the browser's Local Storage. If you clear your browser cache, the data will reset. For a permanent cloud-synced version, consider connecting this UI to a Google Sheet via API.
