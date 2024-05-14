# Define the path of the directory to clean up
$folderPath = "../niov-frontend"

# Get all items in the directory except the specified directories
$items = Get-ChildItem -Path $folderPath | Where-Object {
    # Exclude directories named 'node_modules' or '.git'
    -not ($_.PSIsContainer -and ($_.Name -eq ".git"))
}

# Loop through each item and remove it
foreach ($item in $items) {
    # Display the item to be removed (optional, for verification)
    Write-Output "Removing: $($item.FullName)"

    # Remove the item, use -Force to remove hidden or read-only items, and -Recurse if it's a directory
    Remove-Item $item.FullName -Force -Recurse -ErrorAction Continue
}

Write-Output "Cleanup completed."

exit 0