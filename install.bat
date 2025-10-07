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

echo.
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

:error_exit
echo Press any key to exit...
pause >nul
exit /b 1

:normal_exit
echo Press any key to exit...
pause >nul
exit /b 0
