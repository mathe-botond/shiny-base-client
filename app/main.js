const {app, BrowserWindow, Menu} = require('electron');
const isDev = require('electron-is-dev');

var printer = require('./engine/printer.js');
var mySettings = require('./engine/settings');

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, printerWin;

if (isDev) {
    require('electron-reload')(__dirname, {
        ignored: [
            /node_modules|[/\\]\.|.*\.ts/
        ]
    });
}

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        show: false,
        icon: path.join(__dirname, 'resources/icon.png')
    });

    printerWin = new BrowserWindow({show: false, useContentSize: true});

    win.maximize();

    Menu.setApplicationMenu(null);

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        hash: "",
        slashes: true
    }));

    printerWin.loadURL(
        url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            hash: "print",
            slashes: true
        })
    );

    win.on('closed', () => {
        win = null;
        printerWin.close();
        printerWin = null;
    });

    win.once('ready-to-show', () => {
        win.show();
    });

    if (isDev) {
        win.webContents.openDevTools();
        printerWin.webContents.openDevTools();
        // printerWin.show();
    }

    printer.listen(win, printerWin);
    mySettings.listen();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
        if (win === null) {
        createWindow()
    }
});
