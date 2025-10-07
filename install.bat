@echo off
:: ========================================
::  ETHERITH CLI - NPM INSTALLER
:: ========================================

title Etherith CLI Installer

cls
echo.
echo ========================================
echo   ETHERITH CLI INSTALLER
echo ========================================
echo.
echo This will install Etherith CLI globally
echo so you can use it from anywhere as "etherith"
echo.
echo Press any key to start...
pause >nul
cls

:: ========================================
::  CHECK NODE.JS INSTALLATION
:: ========================================

echo.
echo Checking Node.js installation...
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed!
    echo.
    echo Installing Node.js...
    echo.
    goto install_nodejs
)

:: Check Node.js version
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo Node.js %NODE_VERSION% detected
echo.

:: ========================================
::  INSTALL ETHERITH CLI
:: ========================================

echo Installing Etherith CLI...
echo.
echo This will:
echo   1. Install dependencies
echo   2. Build the project
echo   3. Link CLI globally (npm link)
echo.
echo ----------------------------------------
echo.

npm run install-cli

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   INSTALLATION FAILED
    echo ========================================
    echo.
    echo The installation encountered an error.
    echo.
    echo Common solutions:
    echo   1. Run as administrator
    echo   2. Clear cache: npm cache clean --force
    echo   3. Manual install: npm install ^&^& npm run build ^&^& npm link
    echo.
    goto error_exit
)

:: Success!
cls
echo.
echo ========================================
echo   INSTALLATION COMPLETE!
echo ========================================
echo.
echo Etherith CLI is now installed globally!
echo.
echo You can now use it from anywhere:
echo.
echo   etherith --help
echo   etherith init "My Family Archive"
echo   etherith add "photo.jpg"
echo   etherith search "grandma"
echo.
echo ========================================
echo   QUICK START
echo ========================================
echo.
echo 1. Create your vault:
echo    etherith init "Family Archive"
echo.
echo 2. Add a file:
echo    etherith add path\to\file.jpg
echo.
echo 3. Search:
echo    etherith search keyword
echo.
echo 4. Get help:
echo    etherith --help
echo.
echo ========================================
echo.
echo To uninstall: npm run uninstall-cli
echo.
goto normal_exit

:: ========================================
::  NODE.JS INSTALLATION
:: ========================================

:install_nodejs
echo ========================================
echo   INSTALLING NODE.JS
echo ========================================
echo.
echo Downloading Node.js LTS installer...
echo.

:: Detect system architecture
set ARCH=x64
if "%PROCESSOR_ARCHITECTURE%"=="x86" set ARCH=x86

:: Node.js LTS version
set NODE_VERSION=20.11.0
set INSTALLER_NAME=node-v%NODE_VERSION%-x64.msi
set DOWNLOAD_URL=https://nodejs.org/dist/v%NODE_VERSION%/%INSTALLER_NAME%

:: Create temp directory
set TEMP_DIR=%TEMP%\etherith-installer
if not exist "%TEMP_DIR%" mkdir "%TEMP_DIR%"

echo Downloading from: %DOWNLOAD_URL%
echo.
echo This may take a few minutes...
echo.

:: Download using PowerShell
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri '%DOWNLOAD_URL%' -OutFile '%TEMP_DIR%\%INSTALLER_NAME%'}"

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   DOWNLOAD FAILED
    echo ========================================
    echo.
    echo Could not download Node.js installer.
    echo.
    echo Please install Node.js manually from:
    echo   https://nodejs.org/
    echo.
    echo Then run this installer again.
    echo.
    goto error_exit
)

echo.
echo Installing Node.js...
echo.
echo Please follow the Node.js installer prompts.
echo After installation, this script will continue.
echo.

:: Run installer
msiexec /i "%TEMP_DIR%\%INSTALLER_NAME%" /passive

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   NODE.JS INSTALLATION FAILED
    echo ========================================
    echo.
    echo Please install Node.js manually from:
    echo   https://nodejs.org/
    echo.
    echo Then run this installer again.
    echo.
    goto error_exit
)

:: Clean up
del "%TEMP_DIR%\%INSTALLER_NAME%" >nul 2>nul

echo.
echo ========================================
echo   NODE.JS INSTALLED SUCCESSFULLY
echo ========================================
echo.
echo Please close this window and run the installer again
echo to complete the Etherith CLI installation.
echo.
echo (You may need to restart your terminal for Node.js to be available)
echo.

goto normal_exit

:error_exit
echo Press any key to exit...
pause >nul
exit /b 1

:normal_exit
echo Press any key to exit...
pause >nul
exit /b 0
