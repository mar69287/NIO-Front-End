# Script to add changes, commit with a message, and push to the main branch
param (
    [string]$commitMessage
)

# Check if the commit message is provided
if ([string]::IsNullOrEmpty($commitMessage)) {
    Write-Host "Error: Commit message cannot be empty." -ForegroundColor Red
    exit 1
}

# Navigate to the Git repository (current directory in this case)
$originalLocation = Get-Location
Set-Location "../niov-frontend"
$repoPath = Get-Location
Write-Host "Repository path: $repoPath"

# Add all changes
git add .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to add changes." -ForegroundColor Red
    exit 1
}

# Commit the changes with the provided message
git commit -m "MRR SYNC: $commitMessage"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to commit changes." -ForegroundColor Red
    exit 1
}

# Push the changes to the main branch
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to push changes to the main branch." -ForegroundColor Red
    exit 1
}

Write-Host "Changes successfully pushed to the main branch!"

Set-Location $originalLocation
exit 0