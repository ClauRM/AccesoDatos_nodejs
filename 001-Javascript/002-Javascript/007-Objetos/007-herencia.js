class Animal {
    constructor() {

    }
    respira() {
        return "El animal esta respirando";
    }
}

class Persona extends Animal { //implementa todo lo que tiene la clase superior
    //constructor
    constructor() {
        //propiedades del objeto
        super(); //aniade super
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
console.log(persona1.getNombre());
console.log(persona1.saludar());
console.log(persona1.respira()); //funcion del animal que se ha extendido a la persona