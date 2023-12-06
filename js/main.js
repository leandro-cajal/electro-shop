let montoInicial, respuestaUsuario;

function simuladorCuotas(montoInicial, numCuotas) {
    let valorDeCuota;
    let montoFinal;
    switch (numCuotas) {
        case 3:
            montoFinal = montoInicial * 1.2;
            valorDeCuota = montoFinal / 3;
            alert(`Por el préstamo de $${montoInicial} el monto a abonar con interés sería de $${montoFinal}, y el valor de cada cuota sería de $${valorDeCuota}`);
            break;

        case 6:
            montoFinal = montoInicial * 1.4;
            valorDeCuota = montoFinal / 6;
            alert(`Por el préstamo de $${montoInicial} el monto a abonar con interés sería de $${montoFinal}, y el valor de cada cuota sería de $${valorDeCuota}`);
            break;

        case 12:
            montoFinal = montoInicial * 1.6;
            valorDeCuota = montoFinal / 12;
            alert(`Por el préstamo de $${montoInicial} el monto a abonar con interés sería de $${montoFinal}, y el valor de cada cuota sería de $${valorDeCuota}`);
            break;

        default:
            alert("El número de cuotas indicadas no son válidas");
    }
}

do {
    respuestaUsuario = prompt("Desea realizar una consulta? Responda si/no").toLowerCase();
    while (respuestaUsuario !== "si" && respuestaUsuario !== "no"){
        respuestaUsuario = prompt("Su respuesta no es válida, desea realizar una consulta? Responda si/no").toLowerCase();
    }

    if (respuestaUsuario !== "si") {
        alert("Gracias por consultar con nosotros!");
        break;
    }

    let prestamo = parseInt(prompt("Ingrese el valor del préstamo"));

    if (isNaN(prestamo) || prestamo < 1000) {
        alert("Ha ingresado un monto inválido.");
    }else{
        let numCuotas = parseInt(prompt("Ingrese número de cuotas, 3, 6 o 12"));
        simuladorCuotas(prestamo, numCuotas);
    }

} while (respuestaUsuario === "si");

