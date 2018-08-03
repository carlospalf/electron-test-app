const Config = require("./config/config.js");
const electron = require('electron');
const path = require('path');
const url = require('url');

// Set environment variable, this enable or disable devtools
process.env.NODE_ENV = Config.environment;

/* Obtain electron variables */
const {app, BrowserWindow} = electron;
let mainWindow;

// Listen to ready event to create de mainwindow
app.on('ready', function(){
  // Crea una ventana
  mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    width: 800,
    height: 600,
    backgroundColor: '#8080ff',
    show: false,
});

//  Bind function to closed event
mainWindow.on('closed', function () {
  // Unlink the closed window.
  mainWindow = null
});

// Listen to window-all-closed event to stop execution of electron app
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

  // Charge the index.html in the created window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  });

});