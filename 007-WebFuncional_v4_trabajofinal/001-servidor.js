var servidor = require('http');//require permite importar modulos
var archivo = require('fs');//libreria para leer archivos
var procesador = require('querystring');//utilidades para trabajar con cadenas
var mysql = require('mysql'); //utilidad para trabajar con bd
var mongoose = require('mongoose'); //npm install mongoose

const conexionmongoose = "mongodb://localhost:27017/contacto"; //url + base de datos

//crear esquema para mostrar lo que va a recibir
const formularioSchema = new
    mongoose.Schema({
        nombre: String,
        fecha: String,
        email: String,
        comentarios: String
    });

//crear elemento Formulario con el modelo de datos FormularioShema
const Formulario = mongoose.model("Formulario", formularioSchema);

//realizar conexion a la bd mongo DB
mongoose.connect(conexionmongoose)
    .then(function () {
        console.log("Conectado a MongoDB");
    });


//crear variable con los datos de conexion a phpmyadmin
var conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejsweb"
});

//realizar conexion a la base de datos phpmyadmin
conexion.connect(function (err) {
    if (err) throw err;
    console.log("Conectado a MySql");
});

//crear servidor web haciendo require y response
servidor.createServer(function (req, res) {
    //codigo 200 status OK
    res.writeHead(200, { 'Content-Type': 'text/html' });//tipo de contenido a devolver

    //__dirname asegura que la ruta del archivo es correcta
    const rutaIndex = __dirname + "/index.html";
    const rutaBlog = __dirname + "/blog.html";
    const rutaContact = __dirname + "/contact.html";
    const rutaFaqs = __dirname + "/faqs.html";
    const rutaTreatment = __dirname + "/treatment.html";
    const rutaHeader = __dirname + "/header.html";
    const rutaFooter = __dirname + "/footer.html";

    //cargar encabezado y pie de pagina conjunto para todos los html
    archivo.readFile(rutaHeader, function (err, data) {
        res.write(data); //mostrar la cabecera

        //enrutador
        //con switch devolvemos mensaje en funcion de lo leido en url
        switch (req.url) {
            case "/":
                archivo.readFile(rutaIndex, function (err, indexData) {
                    res.write(indexData);
                });
                break;
            case "/blog":
                archivo.readFile(rutaBlog, function (err, blogData) {
                    if (err) {
                        throw err;
                    }
                    res.write(blogData);
                });

                //ejecutar query sql
                conexion.query(`
                                SELECT * FROM entradasblog
                                `,
                    function (err, resultado, fields) {
                        if (err) throw err;
                        for (let i = 0; i < resultado.length; i++) {
                            console.log(resultado[i]);
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
                archivo.readFile(rutaFaqs, function (err, faqsData) {
                    res.write(faqsData);
                });
                break;
            case "/treatment":
                archivo.readFile(rutaTreatment, function (err, treatmentData) {
                    res.write(treatmentData);
                    res.write(`<tbody>`);
                    //ejecutar query sql
                    conexion.query(`
                                SELECT * FROM tratamientos
                                `,
                        function (err, resultado, fields) {
                            if (err) throw err;
                            for (let i = 0; i < resultado.length; i++) {
                                console.log(resultado[i]);
                                //escribir contenido en la tabla
                                res.write(`
                            <tr>
                              <th scope="row">`+ resultado[i].idtratamiento + `</th>
                              <td>`+ resultado[i].medicamento + `</td>
                              <td>`+ resultado[i].fecha + `</td>
                              <td>`+ resultado[i].idtratamiento + `</td>
                            </tr>
                            `);
                            }
                            //cerrar etiqueta tabla fuera del bucle for
                            res.write(`
                            </table>`)
                        });
                });
                break;
            case "/contact":
                archivo.readFile(rutaContact, function (err, contactData) {
                    res.write(contactData);
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
                    //capturar datos en variables
                    var nnombre = cadenaProcesada.nombre;
                    var nfecha = cadenaProcesada.fecha;
                    var nemail = cadenaProcesada.email;
                    var ncomentarios = cadenaProcesada.comentarios;
                    //crear nuevo Formulario con los datos a insertar
                    var nuevoFormulario = new Formulario(
                        {
                            nombre: nnombre,
                            fecha: nfecha,
                            email: nemail,
                            comentarios: ncomentarios
                        }
                    );
                    //ejecutar sentencia insertar Formulario
                    nuevoFormulario.save()
                        .then(function () {//despues de ejecutar hacer...
                            console.log("Formulario insertado correctamente");
                        })
                });
                break;
            default:
                res.end("Pagina no encontrada");
                break;
        };

        //pie de pagina html
        // archivo.readFile(rutaFooter, function (err, footerData) {
        //     if (err) {
        //         throw err;
        //     }
        //     res.write(footerData);
        //     // res.end(); // Finalizar la respuesta después de enviar el pie de página
        // });
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