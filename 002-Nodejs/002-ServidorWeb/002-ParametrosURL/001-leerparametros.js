var servidor = require('http');//require permite importar modulos
var ruta = require('url');//libreria url

//crear servidor web haciendo require y response
servidor.createServer(function (req, res) {
    //codigo 200 status OK
    res.writeHead(200, { 'Content-Type': 'text/html' });//tipo de contenido a devolver

    //parametros
    var parametros = ruta.parse(req.url, true).query;

    //pasar parametros escrito desde url
    res.write("Tu nombre es " + parametros.nombre);
    res.write("<br>");
    res.write("Tu apellidos son " + parametros.apellidos);

    res.end("");
}).listen(8080) //puerto 8080