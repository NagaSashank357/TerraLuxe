@echo off
@setlocal
set ERROR_CODE=0
if not "%JAVA_HOME%" == "" goto OkJHome
for %%i in (java.exe) do set "JAVACMD=%%~$PATH:i"
goto checkJCmd
:OkJHome
set "JAVACMD=%JAVA_HOME%\bin\java.exe"
:checkJCmd
if exist "%JAVACMD%" goto chkMHome
echo The JAVA_HOME environment variable is not defined correctly >&2
echo This environment variable is needed to run this program >&2
goto error
:chkMHome
set "DIRNAME=%~dp0"
if "%DIRNAME%" == "" set "DIRNAME=."
set "MAVEN_PROJECTBASEDIR=%DIRNAME%"
set WRAPPER_JAR="%DIRNAME%\.mvn\wrapper\maven-wrapper.jar"
"%JAVACMD%" -jar %WRAPPER_JAR% %*
if ERRORLEVEL 1 goto error
goto end
:error
set ERROR_CODE=1
:end
@endlocal & set ERROR_CODE=%ERROR_CODE%
cmd /C exit /B %ERROR_CODE%
