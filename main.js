const { app, BrowserWindow } = require('electron');
const path = require('path');

let overlayWindow = null;
let panelWindow = null;

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

function createControlPanel() {
  /* to my knowldge im using electron to create a window using the operating system, then my ui goes in that window*/
  const options = {
    width: 480,
    height: 270,
    frame: false,
    resizable: false,
    webPreferences: { preload: path.join(__dirname, 'preload.js') }
  };
  panelWindow = new BrowserWindow(options); 
  panelWindow.loadFile(path.join(__dirname, 'control-panel', 'panel.html'));
}

app.whenReady().then(() => {
  createOverlayWindow();
  overlayWindow.hide();
  createControlPanel();
});

app.on('window-all-closed', () => {
  app.quit();
});
