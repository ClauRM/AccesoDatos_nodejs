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

//RUTAS con __dirname asegura que la ruta del archivo es correcta
const rutaIndex = __dirname + "/index.html";
const rutaBlog = __dirname + "/blog.html";
const rutaContact = __dirname + "/contact.html";
const rutaFaqs = __dirname + "/faqs.html";
const rutaTreatment = __dirname + "/treatment.html";
const rutaFooter = __dirname + "/footer.html";

//funcion para manejar cada ruta 
function funcionIndex(res) {
    archivo.readFile(rutaIndex, function (err, indexData) {
        res.write(indexData);
    });
    archivo.readFile(rutaFooter, function (err, footerData) {
        res.write(footerData);
        res.end();
    });
}

function funcionBlog(res) {
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
            archivo.readFile(rutaFooter, function (err, footerData) {
                res.write(footerData);
                res.end();
            });
        });
}

function funcionFaqs(res) {
    archivo.readFile(rutaFaqs, function (err, faqsData) {
        res.write(faqsData);
    });
    archivo.readFile(rutaFooter, function (err, footerData) {
        res.write(footerData);
        res.end();
    });
}

function funcionTreatment(res) {
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
                    //escribir contenido en la tabla
                    res.write(`
                <tr>
                    <td style="display: none;">`+ resultado[i].idtratamiento + `</td>
                    <td>`+ resultado[i].medicamento + `</td>
                    <td>`+ resultado[i].fecha + `</td>
                    <td>`+ resultado[i].hora + `</td>
                    <td>`+ resultado[i].comentarios + `</td>
                </tr>
                `);
                }
                //cerrar etiqueta tabla fuera del bucle for
                res.write(`</tbody></table>`);
                //footer fuera del bucle for
                archivo.readFile(rutaFooter, function (err, footerData) {
                    res.write(footerData);
                    res.end();
                });
            });
    });
}

function funcionContact(res) {
    archivo.readFile(rutaContact, function (err, contactData) {
        res.write(contactData);
    });
    //footer
    archivo.readFile(rutaFooter, function (err, footerData) {
        res.write(footerData);
        res.end();
    });
}

function funcionProcesa(res) {
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
}

function funcionRegistro(res) {
    let datosRegistro = ""; //variable para almacenar datos recibidos del formulario
    //listener del lado del servidor para recibir los datos del formulario
    req.on("data", parte => {
        datosRegistro += parte.toString(); //concatenar datos recibidos clave=valor
    });
    req.on("end", () => {
        var cadenaProcesada = procesador.parse(datosRegistro); //procesar la cadena de datos como un objeto
        //capturar datos en variables
        var nmedicamento = cadenaProcesada.medicamento;
        var nfecha = cadenaProcesada.fecha;
        var nhora = cadenaProcesada.hora;
        var ncomentarios = cadenaProcesada.comentarios;

        //escribir la sentencia SQL
        const sql = `
                            INSERT INTO tratamientos (idtratamiento, medicamento, fecha, hora, comentarios)
                            VALUES (NULL, ?, ?, ?, ?)
                        `;

        //pasar los valores de las variables como un array en el segundo argumento de la función query
        conexion.query(sql, [nmedicamento, nfecha, nhora, ncomentarios], function (error, results, fields) {
            if (error) {
                console.error(error.message);
                res.write(`
                            <div class="px-5">
                                <p>Ha ocorrido un error.
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
                                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                    </svg>
                                </p>
                            </div>         
                             `);
            } else {
                console.log("Registro de tratamiento insertado correctamente en la BD");
                res.write(`
                            <div class="px-5">
                                <p>Tu tratamiento se ha registrado correctamente.</p>
                                <p>Vuelve a Inicio para registrar un nuevo tratamiento y a Tratamientos para consultar todos los tratamientos</p>
                            </div>         
                             `);
            }
            archivo.readFile(rutaFooter, function (err, footerData) {
                res.write(footerData);
                res.end();
            });
        });
    });
}

//exportar las funciones del enrutador
module.exports = {
    funcionIndex,
    funcionBlog,
    funcionFaqs,
    funcionTreatment,
    funcionContact,
    funcionProcesa,
    funcionRegistro
}