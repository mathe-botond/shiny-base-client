var {ipcMain} = require('electron');

function recursivePrint(printerWin, arg, count) {
    printerWin.webContents.print({
        deviceName: arg.settings.print.printer,
        silent: true
    });

    if (count > 1) {
        setTimeout(function() {
            recursivePrint(printerWin, arg, count-1);
        }, 5000);
    }
}

exports.listen = function(win, printerWin) {
    ipcMain.on('get-printer-list', function(event, arg) {
        var printers = win.webContents.getPrinters();
        event.sender.send('printer-list', printers);
    });

    ipcMain.on('print', function(event, arg) {
        printerWin.webContents.send("render-ticket", arg);
    });

    ipcMain.on('layout-print-ready', function(event, arg) {
        recursivePrint(printerWin, arg, arg.count);
    });
};
