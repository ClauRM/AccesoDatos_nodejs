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

//crear nuevo registro
const nuevoFormulario = new Formulario(
    //escribir datos para insertar
    {
        nombre: "Victor Allende",
        asunto: "Este es el primer correo de Victor",
        mensaje: "Este mensaje es para Victor",
        fecha: "2024-02-25"
    }
);


//realizar conexion a la bd mongo DB
mongoose.connect(conexion)
    .then(function () {
        console.log("Conectado a MongoDB");
        //ejecutar sentencia insertar registro
        nuevoFormulario.save()
            .then(function () {//despues de ejecutar hacer...
                console.log("Registro insertado correctamente.");
            })
    });