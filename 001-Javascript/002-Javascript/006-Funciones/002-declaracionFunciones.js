/*
function nombreFuncion(parametros) {
    bloque de codigo;   
}
*/

// function saluda() {
//     console.log("Me llamo Claudia Rubio");
//     console.log("Tengo 45 anios");
//     console.log("Mi email es claudia@email.com");
// }

//con parametros
// function saludaPersona(nombre, edad, email) {
//     console.log("Me llamo " + nombre);
//     console.log("Tengo " + edad + " anios");
//     console.log("Mi email es " + email);
// }

//con return, puesto que las funciones no deberian 'sacar' nada 
function saludaReturn(nombre, edad, email) {
    cadena = "";
    cadena += "Me llamo " + nombre + ". ";
    cadena += "Tengo " + edad + " anios. ";
    cadena += "Mi email es " + email;
    return cadena;
}

// saluda();
// saludaPersona("Victor", 25, "victor@email.com");
// saludaPersona("Claudia", 15, "claudia@email.com");
saludaReturn("Mateo", 20, "mateo@email.com"); 
//console le indica por donde sacar la informacion