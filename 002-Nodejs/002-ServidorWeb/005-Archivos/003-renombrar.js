var archivo = require('fs'); //libreria File System

const rutaAbsoluta = __dirname;

archivo.rename(rutaAbsoluta+'/mensaje.txt', rutaAbsoluta+'/nuevomensaje.txt', function (err) {
    if (err) throw err;
    console.log("El 'dato para aniadir' fue aniadido al archivo!");
});