@echo off
echo 🚀 Deploying Inventory System to Vercel...
echo.

echo 📦 Pushing to GitHub...
git add .
git commit -m "Deploy to Vercel" --allow-empty
git push origin main
echo ✅ Code pushed to GitHub
echo.

echo 🌐 Go to https://vercel.com/new and import your GitHub repo
echo 📝 Set these environment variables in Vercel:
echo    DATABASE_URL=postgresql://user:pass@host:5432/db
echo    JWT_SECRET=your-secret-key-here
echo.

echo 🎯 After deployment, initialize database:
echo    curl https://your-app.vercel.app/api/db-init
echo.

echo 🎉 Deployment complete! Your inventory system is now live on Vercel.
pause