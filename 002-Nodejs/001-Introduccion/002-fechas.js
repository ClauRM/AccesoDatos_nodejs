var servidor = require('http');//require permite importar modulos

//crear servidor web haciendo require y response
servidor.createServer(function (req, res) {
    fecha = new Date();
    res.writeHead(200, { //codigo 200 status OK
        'Content-Type': 'text/html' //tipo de contenido a devolver
    });
    res.write('Hola mundo desde Noje.js');
    res.end(" Anio "+fecha.getFullYear());
    console.log("Servidor levantado");
}).listen(8080) //puerto 8080