var servidor = require('http');//require permite importar modulos
var archivo = require('fs');//libreria para leer archivos

//crear servidor web haciendo require y response
servidor.createServer(function (req, res) {
    //codigo 200 status OK
    res.writeHead(200, { 'Content-Type': 'text/html' });//tipo de contenido a devolver

    //__dirname asegura que la ruta del archivo es correcta
    const rutaIndex = __dirname + "/index.html";
    const rutaAboutme = __dirname + "/aboutme.html";
    const rutaContact = __dirname + "/contact.html";

    //enrutador
    //con switch devolvemos mensaje en funcion de lo leido en url
    switch (req.url) {
        case "/":
            console
            archivo.readFile(rutaIndex, function (err, data) {
                res.write(data);
                res.end("");
            });
            break;
        case "/aboutme":
            archivo.readFile(rutaAboutme, function (err, data) {
                res.write(data);
                res.end("");
            });;
            break;
        case "/contact":
            archivo.readFile(rutaContact, function (err, data) {
                res.write(data);
                res.end("");
            });
            break;
        default:
            res.end("Pagina no encontrada");
            break;
    };

}).listen(8080) //puerto 8080