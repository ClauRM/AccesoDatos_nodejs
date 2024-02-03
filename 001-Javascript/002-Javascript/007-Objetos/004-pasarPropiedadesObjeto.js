class Persona {
    //constructor
    constructor() {
        //propiedades del objeto
        this.edad = 0;
        this.nombre = "";
    }
    //metodos
    saludar() {
        console.log("Hola, me llamo " + this.nombre + " y tengo " + this.edad + " anios.")
    }
}

//instancia
var persona1 = new Persona();

//pasar valores al objeto
persona1.edad = 45;
persona1.nombre = "Claudia";

//salida
persona1.saludar();