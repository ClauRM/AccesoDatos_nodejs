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
        UPDATE entradas
        SET titulo = 'Titulo modificado'
        WHERE id = 1
    `,
        function (err, resultado) {
            if (err) throw err;
            console.log("Se ha actualizado el registro en la base de datos");
        });
});