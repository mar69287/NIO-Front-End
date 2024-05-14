$targetPath = "../niov-frontend/"

# Get all items in the target path, excluding the .git folder
$items = Get-ChildItem -Path $targetPath -Recurse -Force | Where-Object {
    $_.FullName -notlike "*.git*"
}

# Delete each item if it still exists
foreach ($item in $items) {
    try {
        if (Test-Path -Path $item.FullName) {
            if ($item.PSIsContainer) {
                Remove-Item -Path $item.FullName -Recurse -Force
            }
            else {
                Remove-Item -Path $item.FullName -Force
            }
        }
        else {
            Write-Host "Warning: $($item.FullName) no longer exists." -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "Error: Failed to delete $($item.FullName): $_" -ForegroundColor Red
    }
}

Write-Host "Contents of $targetPath deleted, except for the .git folder." -ForegroundColor Green
