var servidor = require('http');//require permite importar modulos

//crear servidor web haciendo require y response
servidor.createServer(function (req, res) {
    //codigo 200 status OK
    res.writeHead(200, { 'Content-Type': 'text/html' });//tipo de contenido a devolver
    res.write("<h1>Hola mundo desde Noje.js</h1>");//introduciendo etiquetas html
    res.end(req.url); //leer desde la url
    console.log("Servidor levantado");
}).listen(8080) //puerto 8080