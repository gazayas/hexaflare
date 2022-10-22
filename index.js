// Mainly the tutorial code from https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app

const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  // Start in fullscreen.
  const win = new BrowserWindow({show: false});
  win.maximize();
  win.loadFile('pages/index.html')
}


app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
