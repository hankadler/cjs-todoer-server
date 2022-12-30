const { app, BrowserWindow } = require("electron");

if (app.isPackaged) process.env.NODE_ENV = "production";

const fs = require("fs");
const shell = require("shelljs");
const server = require("../index");

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

const deleteMongoLock = async () => {
  const lockFile = "C:/data/db/mongod.lock";
  if (fs.existsSync(lockFile)) {
    shell.rm("-f", lockFile);
    shell.exec("mongod --repair", { async: false });
  }
};

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: !app.isPackaged
  });

  if (app.isPackaged) {
    await win.loadURL("http://127.0.0.1:4000");
    win.removeMenu();
  } else {
    await win.loadURL("http://127.0.0.1:4000");
    win.autoHideMenuBar = true;
    win.webContents.openDevTools();
  }
};

app.whenReady()
  .then(deleteMongoLock)
  .then(server.start)
  .then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow().catch(({ message }) => console.error(message));
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    process.kill(process.pid, "SIGTERM");
  }
});
