@echo off
echo Deploying to GitHub...
git add .
set "timestamp=%date% %time%"
git commit -m "feat: Project Update - %timestamp%"
git push origin main
echo.
echo Deployment triggered! Vercel will now update automatically.
pause
