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

//salida
console.log(persona1);
persona1.saludar();