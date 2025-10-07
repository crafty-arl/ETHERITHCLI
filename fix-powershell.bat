@echo off
:: ========================================
::  ETHERITH CLI - POWERSHELL FIX
:: ========================================
::
:: This script fixes the PowerShell execution policy issue
:: that prevents Etherith CLI from running in PowerShell.
::
:: Error: "running scripts is disabled on this system"
::
:: ========================================

title Etherith PowerShell Fix

cls
echo.
echo ========================================
echo   ETHERITH POWERSHELL FIX
echo ========================================
echo.
echo This will fix the error:
echo   "running scripts is disabled on this system"
echo.
echo This happens when PowerShell's execution policy
echo prevents npm global commands from running.
echo.
echo ========================================
echo   WHAT THIS DOES
echo ========================================
echo.
echo This will set the PowerShell execution policy to
echo "RemoteSigned" for your user account only.
echo.
echo This allows:
echo   - Locally created scripts to run
echo   - Downloaded scripts (if signed) to run
echo.
echo This does NOT require administrator privileges.
echo.
echo ========================================
echo.
echo Press any key to apply the fix...
pause >nul
cls

echo.
echo Applying PowerShell fix...
echo.

:: Set execution policy for current user
powershell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force"

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   FIX FAILED
    echo ========================================
    echo.
    echo Could not change PowerShell execution policy.
    echo.
    echo MANUAL FIX:
    echo.
    echo 1. Open PowerShell as Administrator
    echo 2. Run this command:
    echo    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
    echo.
    echo OR use CMD instead of PowerShell (no fix needed)
    echo.
    goto error_exit
)

echo.
echo ========================================
echo   FIX APPLIED SUCCESSFULLY!
echo ========================================
echo.
echo PowerShell execution policy has been updated.
echo.
echo You can now run Etherith CLI in PowerShell:
echo.
echo   etherith --help
echo   etherith init "My Family Archive"
echo.
echo ========================================
echo   ALTERNATIVE: USE CMD INSTEAD
echo ========================================
echo.
echo You can also use Command Prompt (CMD) instead
echo of PowerShell - it works without any configuration.
echo.
echo To switch to CMD:
echo   1. Press Win + R
echo   2. Type: cmd
echo   3. Press Enter
echo.
echo ========================================
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
