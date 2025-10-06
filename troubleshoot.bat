@echo off
setlocal enabledelayedexpansion

:: Etherith CLI Troubleshooting Script
:: This script helps diagnose and fix common installation issues

echo.
echo ========================================
echo    ETHERITH CLI - TROUBLESHOOTING
echo ========================================
echo.
echo Diagnosing common installation issues...
echo.

:: Check Node.js installation
echo [1/5] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found in PATH
    echo.
    echo 📍 Checking common Node.js locations:
    
    if exist "%ProgramFiles%\nodejs\node.exe" (
        echo ✅ Found Node.js at: %ProgramFiles%\nodejs\
        echo    Adding to PATH for this session...
        set PATH=%PATH%;%ProgramFiles%\nodejs
    ) else if exist "%ProgramFiles(x86)%\nodejs\node.exe" (
        echo ✅ Found Node.js at: %ProgramFiles(x86)%\nodejs\
        echo    Adding to PATH for this session...
        set PATH=%PATH%;%ProgramFiles(x86)%\nodejs
    ) else (
        echo ❌ Node.js not found in standard locations
        echo    Please install Node.js from: https://nodejs.org/
        echo.
        pause
        exit /b 1
    )
) else (
    echo ✅ Node.js found: 
    node --version
)

echo.

:: Check npm
echo [2/5] Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found in PATH
    echo.
    echo 📍 Checking common npm locations:
    
    if exist "%ProgramFiles%\nodejs\npm.cmd" (
        echo ✅ Found npm at: %ProgramFiles%\nodejs\npm.cmd
        set PATH=%PATH%;%ProgramFiles%\nodejs
    ) else if exist "%ProgramFiles(x86)%\nodejs\npm.cmd" (
        echo ✅ Found npm at: %ProgramFiles(x86)%\nodejs\npm.cmd
        set PATH=%PATH%;%ProgramFiles(x86)%\nodejs
    ) else if exist "%APPDATA%\npm\npm.cmd" (
        echo ✅ Found npm at: %APPDATA%\npm\npm.cmd
        set PATH=%PATH%;%APPDATA%\npm
    ) else (
        echo ❌ npm not found in standard locations
        echo    Try reinstalling Node.js from: https://nodejs.org/
        echo.
        pause
        exit /b 1
    )
) else (
    echo ✅ npm found: 
    npm --version
)

echo.

:: Check if we're in the right directory
echo [3/5] Checking project files...
if not exist "package.json" (
    echo ❌ package.json not found
    echo    Please run this script from the Etherith CLI directory
    echo.
    pause
    exit /b 1
) else (
    echo ✅ package.json found
)

if not exist "src" (
    echo ❌ src directory not found
    echo    Please run this script from the Etherith CLI directory
    echo.
    pause
    exit /b 1
) else (
    echo ✅ src directory found
)

echo.

:: Check node_modules
echo [4/5] Checking dependencies...
if not exist "node_modules" (
    echo ❌ node_modules not found
    echo    Dependencies not installed. Running npm install...
    echo.
    npm install
    if %errorlevel% neq 0 (
        echo ❌ npm install failed
        echo    Please check your internet connection and try again
        echo.
        pause
        exit /b 1
    )
) else (
    echo ✅ node_modules found
)

echo.

:: Check dist directory
echo [5/5] Checking build files...
if not exist "dist" (
    echo ❌ dist directory not found
    echo    Project not built. Running npm run build...
    echo.
    npm run build
    if %errorlevel% neq 0 (
        echo ❌ npm run build failed
        echo    Please check the error messages above
        echo.
        pause
        exit /b 1
    )
) else (
    echo ✅ dist directory found
)

echo.
echo ========================================
echo         🎉 TROUBLESHOOTING COMPLETE!
echo ========================================
echo.
echo ✅ All checks passed! Your Etherith CLI should be working now.
echo.
echo 🎯 Try running:
echo    node dist/cli.js --version
echo.
echo If that works, you can start preserving your family's legacy:
echo    1. node dist/cli.js init "Your Family Archive"
echo    2. node dist/cli.js add "path/to/family-photo.jpg"
echo    3. node dist/cli.js search "grandma"
echo.
echo Press any key to close...
pause >nul

