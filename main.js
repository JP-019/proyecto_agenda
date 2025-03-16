const { exec } = require('child_process');
const { app, BrowserWindow } = require('electron');

let mainWindow;

// Función para ejecutar el archivo ejecutable
function runExecutable() {
    const executablePath = './servidor/index-win.exe';  // Ruta del ejecutable

    exec(executablePath, (error, stdout, stderr) => {
        if (error) {
            //console.error(`Error ejecutando el archivo: ${error.message}`);
            return;
        }
        if (stderr) {
            //console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL('http://localhost:4200/listar'); // Asumiendo que tu cliente está sirviendo en el puerto 4200
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    // Ejecuta el archivo cuando la app está lista
    runExecutable();

    // Espera unos segundos antes de abrir la ventana de Electron
    setTimeout(createWindow, 1000); // Espera 3 segundos
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
