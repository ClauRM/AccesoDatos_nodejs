var archivo = require('fs'); //libreria File System

const rutaAbsoluta = __dirname;

archivo.unlink(rutaAbsoluta+'/nuevomensaje.txt', function (err) {
    if (err) throw err;
    console.log("El archivo nuevomensaje.txt ha sido eliminado!");
});