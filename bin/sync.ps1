# Script to add changes, commit with a message, and push to the main branch
param (
    [string]$commitMessage
)

# Define the list of scripts to execute
$scripts = "clearRepository", "copyFiles", "pushToMain"
$dir = "./bin"

# Execute each script
foreach ($script in $scripts) {
    Write-Host "======================================================="
    Write-Host "Executing script: $script `n" -ForegroundColor Yellow
    try {
        & "$dir\$script.ps1" $commitMessage # Yes, I know this isn't ideal
        if ($LASTEXITCODE -ne 0) {
            Write-Host "`nError: Script $script failed with exit code $LASTEXITCODE." -ForegroundColor Red
        }
        else {
            Write-Host "`nScript $script executed successfully." -ForegroundColor Green
        }
    }
    catch {
        Write-Host "`nError: An exception occurred while executing ${script}: $_" -ForegroundColor Red
    }
}

Write-Host "======================================================="
Write-Host "All scripts executed." -ForegroundColor Green
