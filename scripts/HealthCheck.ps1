# HealthExpress India - System Health Check
# Usage: powershell -ExecutionPolicy Bypass -File scripts\HealthCheck.ps1

$ErrorActionPreference = "Continue"
$ProjectRoot = Get-Location

# Use simple strings to avoid escape character issues
Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "   HealthExpress India - System Health Check" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

function Write-Status ($Name, $Success, $Message) {
    $Color = if ($Success) { "Green" } else { "Red" }
    $Symbol = if ($Success) { "DONE" } else { "FAIL" }
    Write-Host "[$Name] : $Symbol - $Message" -ForegroundColor $Color
}

# 1. Check Toolchain
Write-Host "--- Toolchain Check ---" -ForegroundColor Blue
$Node = Get-Command node -ErrorAction SilentlyContinue
$Npm = Get-Command npm -ErrorAction SilentlyContinue

if ($Node) { Write-Status "Node.js" $true ($Node.Version) } else { Write-Status "Node.js" $false "Missing" }
if ($Npm) { Write-Status "NPM" $true "Present" } else { Write-Status "NPM" $false "Missing" }

# 2. Check Database
Write-Host ""
Write-Host "--- Database Check ---" -ForegroundColor Blue
$DbPath = Join-Path $ProjectRoot "dev.db"
if (Test-Path $DbPath) {
    try {
        $SizeVal = [math]::Round((Get-Item $DbPath).Length / 1KB, 2)
        Write-Status "SQLite DB" $true "Found ($SizeVal KB)"
    } catch {
        Write-Status "SQLite DB" $true "Found (Size unknown)"
    }
} else {
    Write-Status "SQLite DB" $false "dev.db not found in root!"
}

# 3. Environment Config
Write-Host ""
Write-Host "--- Environment Config ---" -ForegroundColor Blue
$EnvPath = Join-Path $ProjectRoot ".env.local"
if (Test-Path $EnvPath) {
    Write-Status ".env.local" $true "Found"
    
    $Content = Get-Content $EnvPath
    $HasDbUrl = $Content -match "DATABASE_URL"
    $HasSmtp = $Content -match "SMTP_PASS"
    
    if ($HasDbUrl) { Write-Status "DB Configuration" $true "Present" } else { Write-Status "DB Configuration" $false "Missing DATABASE_URL" }
    if ($HasSmtp) { Write-Status "SMTP Configuration" $true "Present" } else { Write-Status "SMTP Configuration" $false "Missing SMTP_PASS" }
} else {
    Write-Status ".env.local" $false "Critical config missing!"
}

# 4. Final Output
Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "   Check Complete!" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""
