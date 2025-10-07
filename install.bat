@echo off
setlocal EnableDelayedExpansion

:: ====================================================================
::  ETHERITH - FAMILY LEGACY PRESERVATION INSTALLER
:: ====================================================================

title Etherith Family Archive Installer

:: Set colors using escape sequences (works on Windows 10+)
for /F %%a in ('echo prompt $E ^| cmd') do set "ESC=%%a"
set "RESET=%ESC%[0m"
set "GREEN=%ESC%[32m"
set "CYAN=%ESC%[36m"
set "YELLOW=%ESC%[33m"
set "RED=%ESC%[31m"

cls
echo.
echo ====================================================================
echo              WELCOME TO ETHERITH FAMILY ARCHIVE
echo ====================================================================
echo.
echo   Preserve your family's stories, photos, and memories forever
echo   on the decentralized web - safe, permanent, and accessible
echo.
echo ====================================================================
echo.
echo  This installer will help you set up Etherith in 3 simple steps:
echo.
echo    [Step 1] Check if you have the required software
echo    [Step 2] Configure your computer to run Etherith
echo    [Step 3] Install and activate Etherith
echo.
echo  Don't worry - we'll guide you through everything!
echo.
echo ====================================================================
echo.
echo  Press any key to begin...
pause >nul

:: ====================================================================
::  STEP 1: CHECK FOR NODE.JS
:: ====================================================================

cls
echo.
echo ====================================================================
echo  STEP 1 of 3: Checking System Requirements
echo ====================================================================
echo.
echo  What we're doing: Making sure you have Node.js installed
echo  Why: Etherith needs Node.js to run (it's free software)
echo.
echo  Checking now...
echo.

timeout /t 2 >nul

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo  [!] Node.js is not installed on your computer
    echo.
    echo  Don't worry! We'll install it for you automatically.
    echo.
    goto install_nodejs
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo  [OK] Node.js !NODE_VERSION! is already installed
    echo.
    echo  Great! Your computer is ready.
    echo.
    timeout /t 2 >nul
)

:: ====================================================================
::  STEP 2: CONFIGURE POWERSHELL
:: ====================================================================

cls
echo.
echo ====================================================================
echo  STEP 2 of 3: Configuring Your Computer
echo ====================================================================
echo.
echo  What we're doing: Setting up PowerShell to work with Etherith
echo  Why: This prevents "script cannot be loaded" errors
echo.
echo  Configuring now...
echo.

timeout /t 1 >nul

:: Set execution policy for current user (no admin required)
powershell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force" >nul 2>nul

if %errorlevel% equ 0 (
    echo  [OK] PowerShell configured successfully
    echo.
    echo  Your computer is now ready to run Etherith!
    echo.
) else (
    echo  [!] Note: Could not configure PowerShell automatically
    echo.
    echo  This is okay! If you have issues later, we've included
    echo  a fix-powershell.bat file you can run.
    echo.
)

timeout /t 2 >nul

:: ====================================================================
::  STEP 3: INSTALL ETHERITH
:: ====================================================================

cls
echo.
echo ====================================================================
echo  STEP 3 of 3: Installing Etherith Family Archive
echo ====================================================================
echo.
echo  What we're doing: Installing Etherith on your computer
echo  This includes:
echo.
echo    - Downloading necessary files
echo    - Building the software
echo    - Making "etherith" available everywhere on your computer
echo.
echo  This may take 2-5 minutes depending on your internet speed.
echo.
echo ====================================================================
echo.
echo  Starting installation...
echo.

timeout /t 2 >nul

npm run install-cli

if %errorlevel% neq 0 (
    cls
    echo.
    echo ====================================================================
    echo  INSTALLATION PROBLEM
    echo ====================================================================
    echo.
    echo  Something went wrong during installation.
    echo.
    echo  Here are some things to try:
    echo.
    echo  [1] Close this window, right-click install.bat, and choose
    echo      "Run as administrator"
    echo.
    echo  [2] Clear the installation cache and try again:
    echo      Open Command Prompt and type:
    echo      npm cache clean --force
    echo.
    echo  [3] Check your internet connection and try again
    echo.
    echo  Need more help? Check TROUBLESHOOTING.md in the install folder
    echo.
    echo ====================================================================
    echo.
    goto error_exit
)

:: ====================================================================
::  SUCCESS!
:: ====================================================================

cls
echo.
echo ====================================================================
echo            INSTALLATION COMPLETE - YOU'RE ALL SET!
echo ====================================================================
echo.
echo  Etherith Family Archive is now installed and ready to use!
echo.
echo ====================================================================
echo  QUICK START GUIDE
echo ====================================================================
echo.
echo  Step 1: Create Your Family Archive
echo  -----------------------------------
echo  Type this command to create your family's archive:
echo.
echo    etherith init "My Family Archive"
echo.
echo  This creates a special folder to organize all your memories.
echo.
echo.
echo  Step 2: Add Your First Memory
echo  ------------------------------
echo  Add a photo, document, or any file:
echo.
echo    etherith add "path\to\your\photo.jpg"
echo.
echo  Example:
echo    etherith add "C:\Users\YourName\Pictures\family-reunion.jpg"
echo.
echo  Your file will be uploaded to IPFS and preserved forever!
echo.
echo.
echo  Step 3: Search Your Memories
echo  -----------------------------
echo  Find anything you've saved:
echo.
echo    etherith search "grandma"
echo    etherith search "wedding"
echo    etherith search "2020"
echo.
echo.
echo  Need Help?
echo  ----------
echo  See all available commands:
echo.
echo    etherith --help
echo.
echo ====================================================================
echo  IMPORTANT NOTES
echo ====================================================================
echo.
echo  [1] Use Command Prompt (CMD) or PowerShell to run Etherith
echo      - Press Windows key + R, type "cmd", press Enter
echo.
echo  [2] All files are stored on IPFS (a public, decentralized network)
echo      - Your files are permanent and can't be deleted
echo      - Anyone with the IPFS link can access them
echo      - Don't upload private/sensitive information
echo.
echo  [3] To remove Etherith from your computer later:
echo      Run: npm run uninstall-cli
echo.
echo ====================================================================
echo  TROUBLESHOOTING
echo ====================================================================
echo.
echo  If you see "etherith command not found":
echo    - Close this window and open a NEW Command Prompt
echo    - The command needs a fresh window to work
echo.
echo  If you see "running scripts is disabled":
echo    - Double-click fix-powershell.bat
echo    - OR use Command Prompt (CMD) instead of PowerShell
echo.
echo  Other issues?
echo    - Check TROUBLESHOOTING.md for detailed solutions
echo.
echo ====================================================================
echo.
goto normal_exit

:: ====================================================================
::  NODE.JS INSTALLATION SECTION
:: ====================================================================

:install_nodejs
cls
echo.
echo ====================================================================
echo  INSTALLING NODE.JS
echo ====================================================================
echo.
echo  What is Node.js?
echo  ----------------
echo  Node.js is free software that Etherith needs to run.
echo  Think of it like the engine that powers Etherith.
echo.
echo  What we're doing:
echo  ----------------
echo  1. Downloading Node.js from the official website
echo  2. Installing it on your computer automatically
echo  3. This is 100%% safe and free
echo.
echo ====================================================================
echo.
echo  Preparing to download Node.js...
echo.

timeout /t 2 >nul

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

echo  Starting download...
echo  File size: About 30 MB
echo.
echo  This may take 2-5 minutes depending on your internet speed.
echo  Please be patient - the window might seem frozen, but it's working!
echo.

:: Download using PowerShell
powershell -Command "Write-Host '  Downloading from nodejs.org...' -ForegroundColor Cyan; [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri '%DOWNLOAD_URL%' -OutFile '%TEMP_DIR%\%INSTALLER_NAME%'"

if %errorlevel% neq 0 (
    cls
    echo.
    echo ====================================================================
    echo  DOWNLOAD PROBLEM
    echo ====================================================================
    echo.
    echo  We couldn't download Node.js automatically.
    echo.
    echo  This usually means:
    echo  - Your internet connection was interrupted
    echo  - Your firewall blocked the download
    echo.
    echo  SOLUTION - Install Node.js Manually:
    echo  ------------------------------------
    echo  1. Open your web browser
    echo  2. Go to: https://nodejs.org/
    echo  3. Click the big green "Download" button
    echo  4. Run the downloaded installer
    echo  5. After Node.js is installed, run this installer again
    echo.
    echo ====================================================================
    echo.
    goto error_exit
)

cls
echo.
echo ====================================================================
echo  Download Complete - Installing Node.js
echo ====================================================================
echo.
echo  The Node.js installer window will open now.
echo.
echo  What to do:
echo  -----------
echo  1. Click "Next" through the installer
echo  2. Accept the license agreement
echo  3. Use the default installation location
echo  4. Wait for installation to complete
echo.
echo  After installation finishes:
echo  ---------------------------
echo  1. Close this window
echo  2. Open a NEW Command Prompt window
echo  3. Run install.bat again to install Etherith
echo.
echo ====================================================================
echo.
echo  Opening Node.js installer now...
echo.

timeout /t 3 >nul

:: Run installer
msiexec /i "%TEMP_DIR%\%INSTALLER_NAME%" /passive

if %errorlevel% neq 0 (
    echo.
    echo ====================================================================
    echo  INSTALLATION PROBLEM
    echo ====================================================================
    echo.
    echo  The automatic installation didn't work.
    echo.
    echo  SOLUTION - Install Node.js Manually:
    echo  ------------------------------------
    echo  1. Open File Explorer
    echo  2. Go to: %TEMP_DIR%
    echo  3. Double-click: %INSTALLER_NAME%
    echo  4. Follow the installer prompts
    echo  5. After Node.js is installed, run this installer again
    echo.
    echo ====================================================================
    echo.
    goto error_exit
)

:: Clean up
del "%TEMP_DIR%\%INSTALLER_NAME%" >nul 2>nul

cls
echo.
echo ====================================================================
echo  NODE.JS INSTALLED SUCCESSFULLY!
echo ====================================================================
echo.
echo  Great! Node.js is now installed on your computer.
echo.
echo  NEXT STEPS:
echo  -----------
echo  1. Close this window completely
echo  2. Open a NEW Command Prompt window
echo     (Press Windows key + R, type "cmd", press Enter)
echo  3. Navigate to the Etherith folder
echo  4. Run install.bat again
echo.
echo  Why? Your computer needs a fresh start to recognize Node.js
echo.
echo ====================================================================
echo.

goto normal_exit

:: ====================================================================
::  EXIT HANDLERS
:: ====================================================================

:error_exit
echo  Press any key to close this window...
pause >nul
exit /b 1

:normal_exit
echo  Press any key to close this window...
pause >nul
exit /b 0
