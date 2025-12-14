const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

// Check if we're in development mode
// If NODE_ENV is explicitly set to development, use dev mode
// Otherwise, check if dist folder exists (production build)
const distPath = path.join(__dirname, '../dist');
const isDev = process.env.NODE_ENV === 'development' || (!fs.existsSync(distPath) && !app.isPackaged);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#F8FAFC',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    show: false, // Don't show until ready
  });

  // Show window when ready to avoid flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // In development, load from Vite dev server
  if (isDev) {
    mainWindow.loadURL('http://localhost:8080');
    // Open DevTools in development
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built files
    const indexPath = app.isPackaged
      ? path.join(process.resourcesPath, 'dist/index.html')
      : path.join(__dirname, '../dist/index.html');
    mainWindow.loadFile(indexPath);
  }

  // Remove default menu bar for cleaner browser-like experience
  mainWindow.setMenuBarVisibility(false);
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS, re-create window when dock icon is clicked and no windows open
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
