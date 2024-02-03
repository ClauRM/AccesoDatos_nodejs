class Persona {
    //constructor
    constructor() {
        //propiedades del objeto
        this.edad = 0;
        this.nombre = "";
    }
    //setter
    setEdad(nuevaEdad) {
        this.edad = nuevaEdad;
    }
    setNombre(nuevNombre) {
        this.nombre = nuevNombre;
    }
    //getter
    getEdad() {
        return this.edad;
    }
    getNombre() {
        return this.nombre;
    }
    //metodos
    saludar() {
        //console.log("Hola, me llamo " + this.nombre + " y tengo " + this.edad + " anios.")
        return "Hola, me llamo " + this.nombre + " y tengo " + this.edad + " anios.";

    }
}

//instancia
var persona1 = new Persona();

//setear valores al objeto
persona1.setEdad(45);
persona1.setNombre("Claudia");

//salida
//persona1.saludar();
console.log(persona1.saludar());