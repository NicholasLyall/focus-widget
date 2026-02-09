const { app, BrowserWindow } = require('electron');
const path = require('path');

let overlayWindow = null;

function createOverlayWindow() {
  const options = {
    width: 1920,
    height: 1080,
    transparent: true,
    frame: false,
    alwaysOnTop: true, 
    skipTaskbar: true,
    webPreferences: { 
      preload: path.join(__dirname, 'preload.js')
    } 
  };

  overlayWindow = new BrowserWindow(options);
  overlayWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  overlayWindow.setIgnoreMouseEvents(true);
}

app.whenReady().then(() => {
  createOverlayWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});
