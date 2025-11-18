# run from repo root (PowerShell)
Get-ChildItem -Path .\frontend -Recurse -File -Include *.js, *.jsx, *.ts, *.tsx, *.json, *.env, *.yml, *.yaml, *.md |
Where-Object { $_.FullName -notmatch '\\node_modules\\' -and $_.Name -notin @('package.json', 'package-lock.json') } |
Select-String -Pattern 'https?://|localhost|127\.0\.0\.1|mongodb://|redis://|ghcr\.io' |
ForEach-Object {
    foreach ($m in $_.Matches) {
        [PSCustomObject]@{
            File       = $_.Path
            LineNumber = $_.LineNumber
            Match      = $m.Value
            Line       = ($_.Line -replace '\r', '') -replace '^\s+|\s+$', ''
        }
    }
} | Export-Csv -Path .\hardcoded_links_frontend.csv -NoTypeInformation -Encoding UTF8