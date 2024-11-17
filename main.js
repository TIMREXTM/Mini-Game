const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true, // Stelle sicher, dass du hier nodeIntegration nutzt, wenn nötig
        },
    });

    mainWindow.loadFile('index.html'); // Startet die Login-Seite
});