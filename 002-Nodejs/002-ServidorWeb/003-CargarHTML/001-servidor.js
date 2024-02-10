var servidor = require('http');//require permite importar modulos
var archivo = require('fs');//libreria para leer archivos

//crear servidor web haciendo require y response
servidor.createServer(function (req, res) {
    //__dirname asegura que la ruta del archivo es correcta
    const rutaArchivo = __dirname + "/inicio.html";

    //leer archivo con posibilidad de error y de datos
    archivo.readFile(rutaArchivo, function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end("");
    });

}).listen(8080) //puerto 8080