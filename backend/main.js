const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");

let mainWindow;
let serverProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
  });

  mainWindow.loadURL("http://localhost:3000");
  mainWindow.webContents.openDevTools(); // pode tirar depois
}

app.whenReady().then(() => {
  // Inicia o backend
  serverProcess = spawn("node", ["server.js"], {
    cwd: __dirname,
    shell: true,
  });

  // Quando o servidor imprimir algo no console, abre a janela
  serverProcess.stdout.on("data", (data) => {
    console.log(`Servidor: ${data}`);
    
    if (!mainWindow) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (serverProcess) {
    serverProcess.kill();
  }

  if (process.platform !== "darwin") {
    app.quit();
  }
});