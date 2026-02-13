# PowerShell script to fix German section indentation
$filePath = "C:/Users/Devron/Downloads/KrantosWeb/app/src/data/translations.ts"
$content = Get-Content $filePath -Raw

# Use regex to fix egregious indentation - remove excessive leading spaces
#  Keep only up to 50 spaces max (which is already way more than needed)
$lines = $content -split "`n"
$fixed = @()

$inDe = $false
$level = 0

for ($i = 0; $i < $lines.Count; $i++) {
    $line = $lines[$i]
    $trimmed = $line -replace '^\s+', ''  # Get trimmed version
    
   # Detect start of de section
    if ($trimmed -eq 'de: {') {
        $inDe = $true
        $level = 1
        $fixed += "  de: {"
        continue
    }
    
    # If we're in the de section
    if ($inDe) {
        # Skip empty lines and comments
       if ($trimmed -eq '' -or $trimmed.StartsWith('//')) {
            $fixed += $line
            continue
        }
        
        # Check if line starts with }
        if ($trimmed.StartsWith('}')) {
            $level--
            if ($level -lt 0) { $level = 0 }
        }
        
        # Apply indentation
        $indent = "  " * $level
        $fixed += "$indent$trimmed"
        
        # Count braces to adjust level for next line
        $opens = ($trimmed.ToCharArray() | Where-Object { $_ -eq '{' }).Count
        $closes = ($trimmed.ToCharArray() | Where-Object { $_ -eq '}' }).Count
        $level += ($opens - $closes)
        
        # If we closed the de section
        if ($level -eq 0 -and $trimmed.StartsWith('}')) {
            $inDe = $false
        }
    }
    else {
        # Not in de section, keep as-is
        $fixed += $line
    }
}

# Write back
$fixed -join "`n" | Set-Content $filePath -NoNewline
Write-Host "Fixed German section indentation"
