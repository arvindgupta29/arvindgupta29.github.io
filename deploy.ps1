# PowerShell Script to Deploy Dr. Arvind Gupta's Portfolio to GitHub Pages
# Run this script in PowerShell from your project directory.

Write-Host "=============================================" -ForegroundColor Green
Write-Host "  GitHub Pages Deployment Script             " -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# 1. Ask for GitHub Username
$username = Read-Host "Enter your GitHub username (e.g., arvindgupta29)"
if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Error "Username cannot be empty."
    exit
}

# 2. Check if git repository is already initialized
if (-not (Test-Path .git)) {
    Write-Host "Initializing local git repository..." -ForegroundColor Yellow
    git init
}

# 3. Rename branch to main
Write-Host "Setting main branch..." -ForegroundColor Yellow
git branch -M main

# 4. Stage and commit files
Write-Host "Staging and committing files..." -ForegroundColor Yellow
git add .
git commit -m "Configure portfolio website" -ErrorAction SilentlyContinue

# 5. Check if remote origin already exists
$remoteExists = git remote | Select-String "origin"
if ($remoteExists) {
    Write-Host "Remote origin already exists. Updating remote URL..." -ForegroundColor Yellow
    git remote set-url origin "https://github.com/$username/$username.github.io.git"
} else {
    Write-Host "Adding remote origin..." -ForegroundColor Yellow
    git remote add origin "https://github.com/$username/$username.github.io.git"
}

# 6. Push to GitHub
Write-Host "Pushing code to https://github.com/$username/$username.github.io ..." -ForegroundColor Yellow
Write-Host "Note: If prompted, please log in or authenticate with GitHub." -ForegroundColor Cyan

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSuccess! Your portfolio has been pushed to GitHub." -ForegroundColor Green
    Write-Host "Once GitHub builds the pages (usually takes 30-60 seconds), your site will be live at:" -ForegroundColor Green
    Write-Host "https://$username.github.io/" -ForegroundColor Cyan -NoNewline
    Write-Host "`n"
} else {
    Write-Warning "`nFailed to push. Please verify: "
    Write-Warning "1. You have created a repository on GitHub named exactly '$username.github.io'"
    Write-Warning "2. Your credentials or personal access token are correct."
}
Write-Host "=============================================" -ForegroundColor Green
