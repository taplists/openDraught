# open_fullscreen.ps1
$URL = "http://localhost:3000"
$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"  # Adjust the path to Chrome if necessary
Start-Process -FilePath $chromePath -ArgumentList "--new-window", "--kiosk $URL"