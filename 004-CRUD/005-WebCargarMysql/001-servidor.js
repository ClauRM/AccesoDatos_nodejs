var servidor = require('http');//require permite importar modulos
var archivo = require('fs');//libreria para leer archivos
var procesador = require('querystring');//utilidades para trabajar con cadenas
var mysql = require('mysql'); //utilidad para trabajar con bd

//crear servidor web haciendo require y response
servidor.createServer(function (req, res) {
    //codigo 200 status OK
    res.writeHead(200, { 'Content-Type': 'text/html' });//tipo de contenido a devolver

    //__dirname asegura que la ruta del archivo es correcta
    const rutaCabecera = __dirname + "/header.html";
    const rutaPiepagina = __dirname + "/footer.html";
    const rutaIndex = __dirname + "/index.html";
    const rutaAboutme = __dirname + "/aboutme.html";
    const rutaContact = __dirname + "/contact.html";
    const rutaBlog = __dirname + "/blog.html";

    //crear conexion a la base de datos phpmyadmin
    var conexion = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "nodejs"
    });

    //establecer conexion
    conexion.connect(function (err) {
        if (err) throw err;
        console.log("Conectado.");
    });

    //cargar los html
    archivo.readFile(rutaCabecera, function (err, data) {
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
                });;
                break;
            case "/contact":
                archivo.readFile(rutaContact, function (err, data) {
                    res.write(data);
                });
                break;
            case "/blog":
                archivo.readFile(rutaBlog, function (err, data) {
                    res.write(data);
                });
                //ejecutar query sql
                conexion.query(`
                        SELECT * FROM entradas
                        `,
                    function (err, resultado, fields) {
                        if (err) throw err;
                        console.log("Listados registros de la base de datos");
                        console.log(resultado);
                        for (let i = 0; i < resultado.length; i++) {
                            //escribir contenido web dinamico
                            res.write(`
                            <article>
                                <h4>`+ resultado[i].titulo + `</h4>
                                <p>`+ resultado[i].texto + `</p>
                                <time>`+ resultado[i].fecha + `</time>
                            </article>
                            `)
                        }
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
                break;
            default:
                res.end("Pagina no encontrada");
                break;
        };

        //pie de pagina html
        archivo.readFile(rutaPiepagina, function (err, data) {
            res.write(data);
            res.end(""); //al cargar el pie de pagina res.end
        });
    });

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