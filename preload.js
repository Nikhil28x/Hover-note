const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  quit: () => ipcRenderer.send('quit-app'),
  copyText: (text) => ipcRenderer.invoke('copy-text', text),
})
