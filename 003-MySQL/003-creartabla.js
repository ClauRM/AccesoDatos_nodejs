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
        CREATE TABLE entradas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255),
            texto TEXT,
            fecha VARCHAR(255)
            )
        `,
        function (err, resultado) {
            if (err) throw err;
            console.log("Se ha creado la base de datos");
        });
});