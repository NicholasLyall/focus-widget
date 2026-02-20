const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let overlayWindow = null;
let panelWindow = null;

const state = {
  active: false,
  mode: null,
  duration: null,
  startTime: null,
  timer: null
};

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

function stopSession() {
  // TODO(human): End the focus session.
  // You need to:
  //   1. Clear the timer if one is running: clearInterval(state.timer) then set state.timer = null
  //   2. Reset state.active to false
  //   3. Hide the overlay: overlayWindow.hide()
  //   4. Show the panel again: panelWindow.show()
}

ipcMain.on('start-session', (event, data) => {
  // TODO(human): Start the focus session.
  // You need to:
  //   1. Set state.active = true, state.mode = data.mode
  //   2. Set state.startTime = Date.now()
  //   3. If timed: state.duration = data.duration * 60 * 1000  (convert minutes to ms)
  //   4. Hide the panel: panelWindow.hide()
  //   5. Show the overlay: overlayWindow.show()
  //   6. If timed, start a timer with setInterval every 1000ms that:
  //        - calculates remaining = state.duration - (Date.now() - state.startTime)
  //        - if remaining <= 0: calls stopSession()
  //        - otherwise: sends remaining to overlay:
  //            overlayWindow.webContents.send('focus-update', { remaining })
  //      Store the timer: state.timer = setInterval(...)
});

app.whenReady().then(() => {
  createOverlayWindow();
  overlayWindow.hide();
  createControlPanel();
});

app.on('window-all-closed', () => {
  app.quit();
});
