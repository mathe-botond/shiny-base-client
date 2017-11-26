const settings = require('electron-settings');
const {ipcMain} = require('electron');

const {extendObject} = require("./common");

// Hard reset settings:
// settings.deleteAll();

exports.listen = function(win, printerWin) {
    ipcMain.on('settings-init', function(event, defaults) {
        console.log('Settings init');
        const merged = extendObject(defaults, settings.getAll());
        settings.setAll(merged);
        event.sender.send("settings-data", settings.getAll());
    });

    ipcMain.on('settings-save', function(event, newSettings) {
        settings.setAll(newSettings);
    });
};
