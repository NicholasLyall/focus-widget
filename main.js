const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');

let overlayWindow = null;
let panelWindow = null;
let historyPath = null;

function loadHistory() {
  if (!fs.existsSync(historyPath)) return [];
  return JSON.parse(fs.readFileSync(historyPath, 'utf8'));
}

function saveHistory(sessions) {
  fs.writeFileSync(historyPath, JSON.stringify(sessions, null, 2));
}

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
  clearInterval(state.timer);
  state.timer = null;
  state.active = false;
  overlayWindow.hide();
  panelWindow.show();

  const sessions = loadHistory();
  const record = {
    date: new Date().toLocaleString(),
    mode: state.mode,
    duration: state.duration,
    startTime: state.startTime,
    endTime: Date.now()
  };
  sessions.push(record);
  saveHistory(sessions);
}

ipcMain.handle('get-history', () => loadHistory());

ipcMain.on('start-session', (event, data) => {
  state.active = true;
  state.mode = data.mode;
  state.startTime = Date.now();
  if (data.mode === 'timed') {
    state.duration = data.duration * 60 * 1000;
  }
  panelWindow.hide();
  overlayWindow.show();
  if (data.mode === 'timed') {
    state.timer = setInterval(() => {
      const remaining = state.duration - (Date.now() - state.startTime);
      if (remaining <= 0) {
        stopSession();
      } else {
        overlayWindow.webContents.send('focus-update', { remaining });
      }
    }, 1000);
  }
});

app.whenReady().then(() => {
  historyPath = path.join(app.getPath('userData'), 'history.json');
  createOverlayWindow();
  overlayWindow.hide();
  createControlPanel();

  // TODO(human): register the global hotkey here
  globalShortcut.register('Ctrl+Shift+F', () => {
    if (state.active) {
      stopSession();
    } else if (panelWindow.isVisible()) {
      panelWindow.hide();
    } else {
      panelWindow.show();
      panelWindow.focus();
    }
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
