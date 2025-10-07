@echo off
:: ========================================
::  ETHERITH CLI - NPM UNINSTALLER
:: ========================================

title Etherith CLI Uninstaller

cls
echo.
echo ========================================
echo   ETHERITH CLI UNINSTALLER
echo ========================================
echo.
echo This will uninstall Etherith CLI globally
echo from your system.
echo.
echo Your vault data will NOT be deleted.
echo.
echo Press any key to continue...
pause >nul
cls

echo.
echo Uninstalling Etherith CLI...
echo.
echo ----------------------------------------
echo.

npm run uninstall-cli

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   UNINSTALLATION FAILED
    echo ========================================
    echo.
    echo The uninstallation encountered an error.
    echo.
    echo Try manual uninstall:
    echo   npm unlink -g etherith-cli
    echo.
    goto error_exit
)

:: Success!
cls
echo.
echo ========================================
echo   UNINSTALLATION COMPLETE!
echo ========================================
echo.
echo Etherith CLI has been removed from your system.
echo.
echo NOTE: Your vault data is preserved.
echo.
echo To reinstall:
echo   Run install.bat or npm run install-cli
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
