const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const remoteMain = require('@electron/remote/main');
remoteMain.initialize();

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // It's more secure to set this to true and use contextBridge
        }
    });

    // Enable remote module for specific webContents
    remoteMain.enable(win.webContents);

    win.webContents.openDevTools();
    // Load the index.html of the app.
    win.loadFile('index.html');
}

ipcMain.on('open-file-dialog', (event) => {
    const window = BrowserWindow.getFocusedWindow();
    dialog.showOpenDialog(window, {
        properties: ['openDirectory']
    }).then(result => {
        if (!result.canceled && result.filePaths.length > 0) {
            event.reply('selected-directory', result.filePaths[0]);
        }
    }).catch(err => {
        console.log(err);
    });
});

// When ready, create the window
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// On macOS, recreate a window in the app when the dock icon is clicked
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
