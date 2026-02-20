
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('focusAPI', {
    startSession: (data) => ipcRenderer.send('start-session', data),
    onUpdate: (callback) => ipcRenderer.on('focus-update', (event, data) => callback(data))

})