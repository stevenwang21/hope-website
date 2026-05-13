@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo ========================================
echo   希望文理 - 本機測試伺服器
echo ========================================
echo.
echo 啟動中... 不要關掉這個視窗
echo 瀏覽器將自動開啟首頁
echo.
echo 網址: http://localhost:8000/
echo ========================================
echo.
start "" "http://localhost:8000/"
python -m http.server 8000 2>nul
if errorlevel 1 (
  py -m http.server 8000 2>nul
)
if errorlevel 1 (
  echo.
  echo [錯誤] 找不到 Python，請先安裝:
  echo https://www.python.org/downloads
  pause
)
