const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let nextProcess;

function startNext() {
  // start next in production mode (expects `next build` done before packaging)
  const cmd = process.env.NODE_ENV === 'production' ? 'npm' : 'npm';
  const args = process.env.NODE_ENV === 'production' ? ['run','start:next'] : ['run','dev'];
  nextProcess = spawn(cmd, args, {
    shell: true,
    env: Object.assign({}, process.env),
    stdio: 'inherit'
  });
  nextProcess.on('exit', code => {
    console.log('next process exited', code);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const url = process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000';
  win.loadURL(url);
}

app.whenReady().then(() => {
  startNext();
  // give next a bit to start in dev; in production next should be fast after start
  setTimeout(createWindow, 2000);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (nextProcess) nextProcess.kill();
    app.quit();
  }
});

app.on('before-quit', () => {
  if (nextProcess) nextProcess.kill();
});
