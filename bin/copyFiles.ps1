$sourcePath = Get-Location
$destinationPath = "../niov-frontend"

function Get-FileHashValue {
    param (
        [string]$filePath
    )
    return Get-FileHash -Algorithm SHA256 -Path $filePath
}

# Copy all items except the .git folder and verify
$items = Get-ChildItem -Path $sourcePath -Recurse -Force | Where-Object {
    $_.FullName -notlike "*.git*" -and $_.FullName -notlike "*\bin*"
}


foreach ($item in $items) {
    $destination = $item.FullName.Replace($sourcePath, $destinationPath)
    
    if ($item.PSIsContainer) {
        if (!(Test-Path -Path $destination)) {
            New-Item -ItemType Directory -Path $destination
        }
    }
    else {
        Copy-Item -Path $item.FullName -Destination $destination -Force
        
        # Verify the copied file
        $sourceHash = Get-FileHashValue -filePath $item.FullName
        $destinationHash = Get-FileHashValue -filePath $destination
        
        if ($sourceHash.Hash -ne $destinationHash.Hash) {
            Write-Host "Hash mismatch for $($item.FullName) and $destination" -ForegroundColor Red
        }
        else {
            Write-Host "File $($item.FullName) copied and verified successfully."
        }
    }
}

Write-Host "Copy and verification completed successfully!"

exit 0