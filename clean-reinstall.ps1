# PowerShell script to clean node_modules, package-lock.json and reinstall

Write-Host "Starting clean reinstall process..." -ForegroundColor Cyan

# Check if we're in the right directory
$currentDir = Get-Location
Write-Host "Current directory: $currentDir" -ForegroundColor Gray

# Remove node_modules if it exists
if (Test-Path -Path ".\node_modules") {
    Write-Host "Removing node_modules directory..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force ".\node_modules"
    Write-Host "node_modules directory removed successfully" -ForegroundColor Green
} else {
    Write-Host "node_modules directory does not exist, skipping removal" -ForegroundColor Gray
}

# Remove package-lock.json if it exists
if (Test-Path -Path ".\package-lock.json") {
    Write-Host "Removing package-lock.json file..." -ForegroundColor Yellow
    Remove-Item -Force ".\package-lock.json"
    Write-Host "package-lock.json file removed successfully" -ForegroundColor Green
} else {
    Write-Host "package-lock.json file does not exist, skipping removal" -ForegroundColor Gray
}

# Install dependencies
Write-Host "Installing dependencies with npm install..." -ForegroundColor Cyan
npm install

# Check if npm install was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencies installed successfully" -ForegroundColor Green
    
    # Run the tests
    Write-Host "Running tests with npm test..." -ForegroundColor Cyan
    npm test
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Tests completed successfully!" -ForegroundColor Green
    } else {
        Write-Host "Tests failed with exit code $LASTEXITCODE" -ForegroundColor Red
    }
} else {
    Write-Host "Failed to install dependencies, exit code: $LASTEXITCODE" -ForegroundColor Red
}

Write-Host "Clean reinstall process complete" -ForegroundColor Cyan
