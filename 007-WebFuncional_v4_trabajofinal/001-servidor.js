var servidor = require('http');//require permite importar modulos
var archivo = require('fs');//libreria para leer archivos

//importar funciones del router.js
const { funcionIndex, funcionBlog, funcionFaqs, funcionTreatment, funcionContact, funcionProcesa, funcionRegistro } = require('./002-routes');

//crear servidor web haciendo require y response
servidor.createServer(function (req, res) {
    //codigo 200 status OK
    res.writeHead(200, { 'Content-Type': 'text/html' });//tipo de contenido a devolver

    //__dirname asegura que la ruta del archivo es correcta
    const rutaHeader = __dirname + "/header.html";

    //cargar encabezado y pie de pagina conjunto para todos los html
    archivo.readFile(rutaHeader, function (err, dataHeader) {
        res.write(dataHeader); //mostrar la cabecera

        //enrutador
        //con switch devolvemos mensaje en funcion de lo leido en url
        switch (req.url) {
            case "/":
                funcionIndex(res);
                break;
            case "/blog":
                funcionBlog(res);
                break;
            case "/faqs":
                funcionFaqs(res);
                break;
            case "/treatment":
                funcionTreatment(res);
                break;
            case "/contact":
                funcionContact(res);
                break;
            case "/procesa":
                funcionProcesa(res);
                break;
            case "/registro":
                funcionRegistro(res);
                break;
            default:
                res.end("Pagina no encontrada");
                break;
        };
    });

    //Formulario de la url visitada por el usuario
    if (req.url != "/favicon.ico") { //descartar almacenar fichero favicon.ico
        var fecha = new Date();
        //con req.url almacenamos la pagina visitada
        //podemos concatenar con la fecha
        archivo.appendFile(__dirname + '/FormularioURLvisitada.txt', fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds() + " " + req.url + "\n", function (err) {
            if (err) throw err;
        });
    }

}).listen(8080) //puerto 8080