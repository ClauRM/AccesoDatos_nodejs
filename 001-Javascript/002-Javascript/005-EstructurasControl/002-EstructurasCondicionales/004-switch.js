var diaSemana = "padel";

switch (diaSemana) {
    case "lunes":
        console.log("Hoy es el peor dia de la semana");
        break;
    case "martes":
        console.log("Hoy es el segundo peor dia de la semana");
        break;
    case "miercoles":
        console.log("Ya estamos a mitad de la semana");
        break;
    case "jueves":
        console.log("Mañana es viernes..");
        break;
    case "viernes":
        console.log("Por fin es viernes!");
        break;
    case "sabado":
        console.log("El mejor dia de la semana!");
        break;
    case "domingo":
        console.log("Mañana de nuevo lunes...");
        break;
    default:
        console.log("Tienes algun error: " + diaSemana + " no es un dia de la semana");
        break;
}