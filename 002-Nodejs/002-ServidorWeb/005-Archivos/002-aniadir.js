var archivo = require('fs'); //libreria File System

const rutaAbsoluta = __dirname;

archivo.appendFile(rutaAbsoluta+'/mensaje.txt', 'dato para aniadir\n', function (err) {
    if (err) throw err;
    console.log("El 'dato para aniadir' fue aniadido al archivo!");
});