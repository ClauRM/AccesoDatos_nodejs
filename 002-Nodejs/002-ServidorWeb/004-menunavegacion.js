var servidor = require('http');//require permite importar modulos

//crear servidor web haciendo require y response
servidor.createServer(function (req, res) {
    //codigo 200 status OK
    res.writeHead(200, { 'Content-Type': 'text/html' });//tipo de contenido a devolver
    res.write("<h1>Hola mundo desde Noje.js</h1>");//introduciendo etiquetas html

    //menu de navegacion
    res.write(`
        <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/acercade">Sobre nosotros</a></li>
            <li><a href="/contacto">Contacto</a></li>
        </ul>
        `);

    //enrutador
    //con switch devolvemos mensaje en funcion de lo leido en url
    switch (req.url) {
        case "/":
            res.end("Estas en el Home");
            break;
        case "/acercade":
            res.end("Estas en la pagina Acerca de mi");
            break;
        case "/contacto":
            res.end("Estas en la pagina de Contacto");
            break;
        default:
            res.end("Pagina no encontrada");
    };
    console.log("Servidor levantado");
}).listen(8080) //puerto 8080