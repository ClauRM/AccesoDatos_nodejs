var servidor = require('http');//modulo para tratamiento http
var procesador = require('querystring');//utilidades para trabajar con cadenas

//crear servidor web haciendo require y response
servidor.createServer(function (req, res) {
    //codigo 200 status OK
    res.writeHead(200, { 'Content-Type': 'text/html' });//tipo de contenido a devolver

    //enrutador
    switch (req.url) {
        case "/":
            res.write(`
                <form action="/procesa" method="POST">
                    <input type="text" name="nombre" placeholder="Nombre"><br><br>
                    <input type="text" name="asunto" placeholder="Asunto"><br><br>
                    <input type="email" name="email" placeholder="Email"><br><br>
                    <textarea name="mensaje"></textarea><br><br>
                    <input type="submit">
                </form>
            `);
            break;
        case "/procesa":
            res.write("Datos procesados");
            let datos = "";
            //listener del lado del servidor
            req.on("data", parte => {
                datos += parte.toString(); //concatenar datos recibidos
            })
            req.on("end", () => {
                var cadenaProcesada = procesador.parse(datos); //procesar cadena de dato como objeto
                console.log(cadenaProcesada);
            })
            break;
        default:
            res.end("Pagina no encontrada");
            break;
    };
    res.end("");

}).listen(8080) //puerto 8080