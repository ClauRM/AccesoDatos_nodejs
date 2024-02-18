var mysql = require('mysql'); //npm install mysql

//datos del acceso a la base de datos phpmyadmin
var conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejsweb"
});

//realizar conexion
conexion.connect(function (err) {
    if (err) throw err;
    console.log("Conectado");
    //ejecutar query sql
    conexion.query(`
        INSERT INTO entradasblog VALUES (
            NULL,
            'Cometa',
            'Titulo de la entrada',
            'Texto de la entrada',
            '2024-02-15'
        )
        `,
        function (err, resultado) {
            if (err) throw err;
            console.log("Se ha insertado el registro en la base de datos");
        });
});