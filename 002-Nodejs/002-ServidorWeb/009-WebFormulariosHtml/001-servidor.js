var servidor = require('http');//require permite importar modulos
var archivo = require('fs');//libreria para leer archivos
var procesador = require('querystring');//utilidades para trabajar con cadenas

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
        case "/procesa":
            res.write("Datos procesados");
            let datos = "";
            //listener del lado del servidor
            req.on("data", parte => {
                datos += parte.toString(); //concatenar datos recibidos
            });
            req.on("end", () => {
                var cadenaProcesada = procesador.parse(datos); //procesar cadena de dato como objeto
                console.log(cadenaProcesada);
            });
            res.end("");
            break;
        default:
            res.end("Pagina no encontrada");
            break;
    };

    //registro de la url visitada por el usuario
    if (req.url != "/favicon.ico") {
        var fecha = new Date();
        //con req.url almacenamos la pagina visitada
        //podemos concatenar con la fecha
        archivo.appendFile(__dirname + '/registro.txt', fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds() + " " + req.url + "\n", function (err) {
            if (err) throw err;
        });
    }

}).listen(8080) //puerto 8080