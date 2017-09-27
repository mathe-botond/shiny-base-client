var {ipcMain} = require('electron');

exports.listen = function(win, printerWin) {
    ipcMain.on('get-printer-list', function(event, arg) {
        var printers = win.webContents.getPrinters();
        event.sender.send('printer-list', printers);
    });

    ipcMain.on('print', function(event, arg) {
        printerWin.show();
        printerWin.webContents.print({name: "POS58", silent: true});
    });
};