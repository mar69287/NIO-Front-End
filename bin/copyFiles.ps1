# Define source and destination paths
$sourcePath = Get-Location
$destinationPath = Join-Path $sourcePath "..\niov-frontend"

# Define excluded directories and files
$excludedDirectories = @('node_modules', '.git', 'bin')
$excludedFiles = @('package-lock.json')

# Function to calculate file hash
function Get-FileHashValue {
    param (
        [string]$filePath
    )
    $fileHash = Get-FileHash -Algorithm SHA256 -Path $filePath
    return $fileHash.Hash
}

# Get all items in the source directory
$items = Get-ChildItem -Path $sourcePath
Write-Host $destinationPath

foreach ($item in $items) {
    $isExcludedDir = $item.PSIsContainer -and $excludedDirectories -contains $item.Name
    $isExcludedFile = -not $item.PSIsContainer -and $excludedFiles -contains $item.Name
    
    if (-not $isExcludedDir -and -not $isExcludedFile) {
        # Calculate relative path
        $relativePath = $item.FullName.Substring($sourcePath.Length + 1)
        # Define the destination path for the current item
        $destItemPath = Join-Path $destinationPath $item.Name
        if ($item.PSIsContainer) {
            Copy-Item -Path $item.FullName -Destination $destItemPath -Recurse
        } else {
            Copy-Item -Path $item.FullName -Destination $destItemPath
        }
    }
}

Write-Host "Copy Complete!"

exit 0