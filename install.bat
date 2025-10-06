@echo off
setlocal enabledelayedexpansion

:: ========================================
::  ETHERITH CLI - INSTALLER
::  Family Legacy Preservation Tool
:: ========================================

title Etherith CLI Installer

cls
echo.
echo ========================================
echo   ETHERITH CLI INSTALLER
echo ========================================
echo.
echo Preserve your family's legacy forever
echo on the decentralized web.
echo.
echo Press any key to start installation...
pause >nul
cls

:: ========================================
:: Step 1: Environment Check
:: ========================================
echo.
echo [1/4] Checking environment...
echo.

:: Check if in correct directory
if not exist "package.json" (
    echo [ERROR] package.json not found
    echo.
    echo Please run this installer from the Etherith CLI directory.
    echo Current directory: %CD%
    echo.
    goto error_exit
)
echo [OK] Found package.json

:: Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found
    echo.
    echo Please install Node.js 18+ from https://nodejs.org/
    echo Then run this installer again.
    echo.
    goto error_exit
)

for /f "tokens=*" %%i in ('node --version 2^>nul') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION%

:: Check npm (with timeout protection)
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm not found
    echo.
    echo npm should be installed with Node.js.
    echo Try reinstalling Node.js from https://nodejs.org/
    echo.
    goto error_exit
)
echo [OK] npm found

echo.
echo Environment check complete.
timeout /t 2 >nul

:: ========================================
:: Step 2: Install Dependencies
:: ========================================
cls
echo.
echo [2/4] Installing dependencies...
echo.
echo This will take 2-5 minutes depending on your internet speed.
echo Please wait...
echo.
echo ----------------------------------------

:: Clear cache first (silently)
echo Clearing npm cache...
npm cache clean --force >nul 2>&1
echo.

:: Install dependencies
npm install
set INSTALL_EXIT=%errorlevel%

echo.
echo ----------------------------------------
echo npm install completed with exit code: %INSTALL_EXIT%
echo ----------------------------------------
echo.
echo Press any key to continue...
pause >nul

if %INSTALL_EXIT% neq 0 (
    echo.
    echo [ERROR] Failed to install dependencies
    echo         Exit code: %INSTALL_EXIT%
    echo.
    echo Common solutions:
    echo   1. Check your internet connection
    echo   2. Run as administrator
    echo   3. Try: npm cache clean --force
    echo   4. Delete node_modules folder and try again
    echo   5. Check if antivirus is blocking npm
    echo.
    echo Check the error messages above for details.
    echo.
    goto error_exit
)

echo [OK] Dependencies installed successfully
timeout /t 2 >nul

:: ========================================
:: Step 3: Build Project
:: ========================================
cls
echo.
echo [3/4] Building project...
echo.
echo Compiling TypeScript code...
echo.
echo ----------------------------------------

npm run build

if %errorlevel% neq 0 (
    echo ----------------------------------------
    echo.
    echo [ERROR] Build failed
    echo.
    echo Check the error messages above.
    echo.
    echo Common solutions:
    echo   1. Make sure all source files are present
    echo   2. Try: npm install typescript -g
    echo   3. Check for TypeScript syntax errors
    echo.
    goto error_exit
)

echo ----------------------------------------
echo.
echo [OK] Build completed successfully
timeout /t 2 >nul

:: ========================================
:: Step 4: Verify Installation
:: ========================================
cls
echo.
echo [4/4] Verifying installation...
echo.

if not exist "dist\cli.js" (
    echo [ERROR] CLI file not found: dist\cli.js
    echo.
    echo Build may have failed silently.
    echo Check the dist directory.
    echo.
    goto error_exit
)
echo [OK] CLI file exists: dist\cli.js

:: Test the CLI
node dist\cli.js --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] CLI is working correctly
) else (
    echo [WARN] CLI test returned an error
    echo        But it may still work for your use case
)

echo.
timeout /t 2 >nul

:: ========================================
:: Installation Complete
:: ========================================
cls
echo.
echo ========================================
echo   INSTALLATION COMPLETE!
echo ========================================
echo.
echo Etherith CLI is ready to preserve your family's legacy!
echo.
echo ========================================
echo   QUICK START GUIDE
echo ========================================
echo.
echo 1. Create your family vault:
echo    node dist\cli.js init "My Family Archive"
echo.
echo 2. Add your first treasure:
echo    node dist\cli.js add "path\to\photo.jpg"
echo.
echo 3. Search your memories:
echo    node dist\cli.js search "grandma"
echo.
echo 4. View all commands:
echo    node dist\cli.js --help
echo.
echo ========================================
echo.
echo For help and documentation, see README.md
echo.
goto normal_exit

:: ========================================
:: Error Exit
:: ========================================
:error_exit
echo ========================================
echo   INSTALLATION FAILED
echo ========================================
echo.
echo Please check the error message above and try again.
echo.
echo Need help? Check INSTALLATION.md for troubleshooting.
echo.
echo Press any key to exit...
pause >nul
exit /b 1

:: ========================================
:: Normal Exit
:: ========================================
:normal_exit
echo Press any key to exit...
pause >nul
exit /b 0

:: Safety catch - should never reach here
:eof
echo.
echo [UNEXPECTED] Script reached end without proper exit
echo.
pause
exit /b 1
