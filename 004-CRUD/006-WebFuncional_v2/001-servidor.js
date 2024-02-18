var servidor = require('http');//require permite importar modulos
var archivo = require('fs');//libreria para leer archivos
var procesador = require('querystring');//utilidades para trabajar con cadenas
var mysql = require('mysql'); //utilidad para trabajar con bd


//crear servidor web haciendo require y response
servidor.createServer(function (req, res) {
    //codigo 200 status OK
    res.writeHead(200, { 'Content-Type': 'text/html' });//tipo de contenido a devolver

    //__dirname asegura que la ruta del archivo es correcta
    const rutaIndex = __dirname + "/index.html";
    const rutaAboutme = __dirname + "/aboutme.html";
    const rutaContact = __dirname + "/contact.html";
    const rutaFaqs = __dirname + "/faqs.html";
    const rutaProducts = __dirname + "/products.html";
    const rutaHeader = __dirname + "/header.html";
    const rutaFooter = __dirname + "/footer.html";

    //crear conexion a la base de datos phpmyadmin
    var conexion = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "nodejsweb"
    });

    //establecer conexion
    conexion.connect(function (err) {
        if (err) throw err;
        console.log("Conectado a nodejsweb.");
    });

    //cargar encabezado y pie de pagina conjunto para todos los html
    archivo.readFile(rutaHeader, function (err, data) {
        res.write(data); //mostrar la cabecera

        //enrutador
        //con switch devolvemos mensaje en funcion de lo leido en url
        switch (req.url) {
            case "/":
                console
                archivo.readFile(rutaIndex, function (err, data) {
                    res.write(data);
                });
                break;
            case "/aboutme":
                archivo.readFile(rutaAboutme, function (err, data) {
                    res.write(data);
                });
                //ejecutar query sql
                conexion.query(`
                                SELECT * FROM entradasblog
                                `,
                    function (err, resultado, fields) {
                        if (err) throw err;
                        for (let i = 0; i < resultado.length; i++) {
                            //escribir contenido web dinamico
                            res.write(`
                            <div class="d-flex justify-content-center">
                                <div class="my-20 mx-20 w-75">
                                    <article class="blog-post">
                                        <h2 class="display-5 link-body-emphasis mb-1">`+ resultado[i].titulo + `</h2>
                                        <p class="blog-post-meta">`+ resultado[i].fecha + `, by ` + resultado[i].autor + `</p>
                                        <p>`+ resultado[i].texto + `</p>
                                    </article>
                                </div>
                            </div>
                            <hr>
                            `)
                        }
                    });
                break;
            case "/faqs":
                archivo.readFile(rutaFaqs, function (err, data) {
                    res.write(data);
                });
                break;
            case "/products":
                archivo.readFile(rutaProducts, function (err, data) {
                    res.write(data);
                });
                break;
            case "/contact":
                archivo.readFile(rutaContact, function (err, data) {
                    res.write(data);
                });
                break;
            case "/procesa":
                res.write(`
                    <div class="d-flex flex-wrap justify-content-center py-3 mb-4">
                        <p>Tus datos se han enviado correctamente.</p>
                    </div>         
                    `);
                let datos = ""; //var almacenar datos recibidos
                //listener del lado del servidor
                req.on("data", parte => {
                    datos += parte.toString(); //concatenar datos recibidos clave=valor
                });
                req.on("end", () => {
                    var cadenaProcesada = procesador.parse(datos); //procesador querystring de cadena de dato como objeto
                    console.log(cadenaProcesada);
                });
                break;
            default:
                res.end("Pagina no encontrada");
                break;
        };

        //pie de pagina html
        archivo.readFile(rutaFooter, function (err, data) {
            res.write(data);
            res.end(""); //al cargar el pie de pagina res.end
        });
    });

    //registro de la url visitada por el usuario
    if (req.url != "/favicon.ico") { //descartar almacenar fichero favicon.ico
        var fecha = new Date();
        //con req.url almacenamos la pagina visitada
        //podemos concatenar con la fecha
        archivo.appendFile(__dirname + '/registroURLvisitada.txt', fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds() + " " + req.url + "\n", function (err) {
            if (err) throw err;
        });
    }

}).listen(8080) //puerto 8080