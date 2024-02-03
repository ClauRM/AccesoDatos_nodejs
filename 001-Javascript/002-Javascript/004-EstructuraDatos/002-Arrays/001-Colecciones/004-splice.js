//Arrays
var agenda = [];
agenda[0] = "Claudia Rubio";
agenda[1] = "Mateo";
agenda[2] = "Cometa";

//push aniade elemento al final de array
agenda.push("Victor"); //no hay necesidad de calcular el indice 
console.table(agenda); 

//pop quita elementos del final de la lista
agenda.pop();
console.table(agenda);

//splice quita el numero de elementos que indiquemos
//recibe dos atributos: indice y cuantos
agenda.splice(0,1);
console.table(agenda);