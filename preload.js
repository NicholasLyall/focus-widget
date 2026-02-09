// TODO(human): Create the preload bridge.
//
// This file connects main.js (Node.js) to the renderer (web page).
// You need to:
//   1. Import contextBridge and ipcRenderer from 'electron'
//   2. Use contextBridge.exposeInMainWorld() to create a 'focusAPI' object
//   3. That object should expose one method: onUpdate
//      - onUpdate receives a callback function
//      - It should listen for the 'focus-update' IPC channel
//      - When a message arrives, call the callback with the data
