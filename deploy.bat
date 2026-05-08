@echo off
echo 🚀 ThreadCount Cloud Deployment to Vercel
echo.

echo Pushing code to GitHub...
git add .
git commit -m "Cloud deployment" --allow-empty
git push origin main

echo.
echo ✅ Code pushed to GitHub
echo.
echo 🌐 Next steps:
echo    1. Go to https://vercel.com/new
echo    2. Import your GitHub repo
echo    3. Add environment variables:
echo       - DATABASE_URL=your_postgresql_connection_string
echo       - JWT_SECRET=your_random_secret_key
echo    4. Click Deploy
echo.
echo 📚 See VERCEL_SETUP.md for detailed instructions
echo.

echo 🎉 Deployment complete! Your inventory system is now live on Vercel.
pause