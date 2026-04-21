const { app, BrowserWindow, globalShortcut, ipcMain, screen, clipboard, shell } = require('electron')
const path = require('path')

const WINDOW_WIDTH = 320
const WINDOW_HEIGHT = 220
const MIN_WIDTH = 240
const MIN_HEIGHT = 160
const SCREEN_MARGIN = 24
const MAX_CLIPBOARD_CHARS = 1_000_000

let win

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  win = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    x: width - WINDOW_WIDTH - SCREEN_MARGIN,
    y: height - WINDOW_HEIGHT - SCREEN_MARGIN,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: true,
    show: false,
    hasShadow: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  })

  win.loadFile('index.html')

  win.once('ready-to-show', () => {
    win.show()
    win.focus()
  })

  win.setAlwaysOnTop(true, 'floating', 1)
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })

  win.webContents.on('will-navigate', (event) => { event.preventDefault() })
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//.test(url)) shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(() => {
  createWindow()

  const shortcut = process.platform === 'darwin' ? 'Command+Shift+N' : 'Control+Shift+N'
  const registered = globalShortcut.register(shortcut, () => {
    if (!win || win.isDestroyed()) return
    if (win.isVisible()) {
      win.hide()
    } else {
      win.show()
      win.focus()
    }
  })
  if (!registered) {
    console.warn(`Failed to register global shortcut "${shortcut}" — another app may own it.`)
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('quit-app', () => {
  app.quit()
})

ipcMain.handle('copy-text', (_event, text) => {
  if (typeof text !== 'string') return
  clipboard.writeText(text.slice(0, MAX_CLIPBOARD_CHARS))
})
