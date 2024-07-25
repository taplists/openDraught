@echo off
setlocal

set "TARGET=run.bat"
set "SHORTCUT_NAME=openDraught.lnk"
set "ICON_PATH=public\icon.ico"  :: Specify the path to your icon file here
set "STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"

:: Check if the shortcut exists
if exist "%~dp0%SHORTCUT_NAME%" (
    echo Shortcut already exists.
    goto :ask_startup
)

:: Check if the target file exists in the same directory as the batch file
if not exist "%~dp0%TARGET%" (
    echo The target file "%TARGET%" does not exist in the same directory as this batch file.
    pause
    exit /b
)

:: Check if the icon file exists in the same directory as the batch file
if not exist "%~dp0%ICON_PATH%" (
    echo The icon file "%ICON_PATH%" does not exist in the same directory as this batch file.
    pause
    exit /b
)

:: Create a VBScript to create the shortcut
(
echo Set objShell = WScript.CreateObject^("WScript.Shell"^)
echo strTargetPath = "%~dp0%TARGET%"
echo strShortcutPath = "%~dp0%SHORTCUT_NAME%"
echo strIconPath = "%~dp0%ICON_PATH%"
echo Set objShortcut = objShell.CreateShortcut^(strShortcutPath^)
echo objShortcut.TargetPath = strTargetPath
echo objShortcut.WorkingDirectory = "%~dp0"
echo objShortcut.WindowStyle = 7
echo objShortcut.IconLocation = strIconPath
echo objShortcut.Save
) > create_shortcut.vbs

:: Run the VBScript to create the shortcut
cscript //nologo create_shortcut.vbs

:: Clean up
del create_shortcut.vbs

echo Shortcut created successfully.

:ask_startup
:: Ask the user if they want to add the shortcut to the Startup folder
set /p "choice=Do you want to add a shortcut to the Startup folder? (Y/N): "
if /i "%choice%"=="Y" (
    :: Create the shortcut in the Startup folder
    echo Creating shortcut in the Startup folder...
    copy "%~dp0%SHORTCUT_NAME%" "%STARTUP_FOLDER%\%SHORTCUT_NAME%"
    echo Shortcut added to the Startup folder.
)

endlocal
pause
