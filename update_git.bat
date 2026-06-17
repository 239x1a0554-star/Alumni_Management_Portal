@echo off
REM Simple script to add, commit, and push changes from the registation-form folder
cd /d "%~dp0"
echo Staging all changes...
git add .
set /p MSG=Enter commit message (leave empty for 'Update'): 
if "%MSG%"=="" set MSG=Update
echo Committing with message: %MSG%
git commit -m "%MSG%"
necho Pushing to remote...
git push
echo Done.
