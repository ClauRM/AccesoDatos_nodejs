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
            'Cometín Sónico',
            'Si funciona no lo toques',
            'Quisque turpis nunc, bibendum in molestie id, vestibulum eget erat. Aenean id felis euismod, dictum magna id, luctus mauris. Sed nibh libero, interdum eu tincidunt vel, blandit eget lorem. Duis et gravida magna. Praesent interdum felis non tortor pharetra, a accumsan metus fermentum. Aenean velit turpis, sollicitudin ut orci sed, venenatis ullamcorper tortor. Pellentesque tempus tempus turpis, nec dictum augue ornare eu.',
            '2024-02-17'
        )
        `,
        function (err, resultado) {
            if (err) throw err;
            console.log("Se ha insertado el registro en la base de datos");
        });
});