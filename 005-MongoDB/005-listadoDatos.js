var mongoose = require('mongoose'); //npm install mongoose

const conexion = "mongodb://localhost:27017/contacto"; //url + base de datos

//crear esquema para mostrar lo que va a recibir
const formularioSchema = new
    mongoose.Schema({
        nombre: String,
        asunto: String,
        mensaje: String,
        fecha: String
    });

//crear elemento Formulario con el modelo de datos formularioShema
const Formulario = mongoose.model("Formulario", formularioSchema);

//realizar conexion a la bd mongo DB
mongoose.connect(conexion)
    .then(function () {
        console.log("Conectado a MongoDB");
        Formulario.find({}) //ejecutar sentencia listar datos
            .exec() //ejecutar
            .then(function (formularios) {
                console.log(formularios);
            }) //despues de ejecutar hacer...
    });