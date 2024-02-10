var servidor = require('http');//require permite importar modulos

//crear servidor web haciendo require y response
servidor.createServer(function (req, res) {
    res.writeHead(200, { //codigo 200 status OK
        'Content-Type': 'text/html' //tipo de contenido a devolver
    });
    res.end("<h1>Hola mundo desde Noje.js</h1>");//introduciendo etiquetas html
    console.log("Servidor levantado");
}).listen(8080) //puerto 8080