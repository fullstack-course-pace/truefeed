# Run from the repository root (PowerShell). Produces ./hardcoded_links_all.csv
$roots = @('.\backend', '.\frontend')
$exts = @('*.js', '*.jsx', '*.ts', '*.tsx', '*.json', '*.env', '*.yml', '*.yaml', '*.md')
$pattern = 'https?://|localhost|127\.0\.0\.1|mongodb://|redis://|ghcr\.io'

$results = foreach ($root in $roots) {
    if (-Not (Test-Path $root)) { continue }
    Get-ChildItem -Path $root -Recurse -File -Include $exts `
    | Where-Object { $_.FullName -notmatch '\\node_modules\\' -and $_.Name -notin @('package.json', 'package-lock.json') } `
    | Select-String -Pattern $pattern -SimpleMatch |
    ForEach-Object {
        foreach ($m in $_.Matches) {
            [PSCustomObject]@{
                Area       = if ($root -match 'backend') { 'backend' } else { 'frontend' }
                File       = $_.Path
                LineNumber = $_.LineNumber
                Match      = $m.Value
                Line       = ($_.Line -replace '\r', '') -replace '^\s+|\s+$', ''
            }
        }
    }
}

$csvPath = Join-Path -Path (Get-Location) -ChildPath 'hardcoded_links_all.csv'
$results | Export-Csv -Path $csvPath -NoTypeInformation -Encoding UTF8
Write-Host "Written $csvPath"