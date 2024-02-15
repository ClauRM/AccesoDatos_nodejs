var mysql = require('mysql'); //npm install mysql

var conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

conexion.connect(function (err) {
    if (err) throw err;
    console.log("conectado");
});