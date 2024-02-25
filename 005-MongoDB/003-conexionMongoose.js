var mongoose = require('mongoose'); //npm install mongoose

const conexion = "mongodb://localhost:27017/contacto"; //url + base de datos

//realizar la conexion a la bd mongoDB
mongoose.connect(conexion)
    .then(function () {
        console.log("Conectado a MongoDB");
    });