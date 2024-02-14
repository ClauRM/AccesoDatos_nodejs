var servidor = require('http');//require permite importar modulos

//crear servidor web haciendo require y response
servidor.createServer(function (req, res) {
    //codigo 200 status OK
    res.writeHead(200, { 'Content-Type': 'text/html' });//tipo de contenido a devolver

    //enrutador
    switch (req.url) {
        case "/":
            res.write(`
                <form action="/procesa" method="POST">
                    <input type="text" name="nombre">
                    <input type="submit">
                </form>
            `);
            break;
        case "/procesa":
            console.log("Procesamiento de formulario");
            break;
        default:
            res.end("Pagina no encontrada");
            break;
    };
    res.end("");

}).listen(8080) //puerto 8080