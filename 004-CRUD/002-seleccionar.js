var mysql = require('mysql'); //npm install mysql

//datos del acceso a la base de datos phpmyadmin
var conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs"
});

//realizar conexion
conexion.connect(function (err) {
    if (err) throw err;
    console.log("Conectado");
    //ejecutar query sql
    conexion.query(`
        SELECT * FROM entradas
        `,
        function (err, resultado, fields) {
            if (err) throw err;
            console.log("Listados registros de la base de datos");
            console.log(resultado);
        });
});