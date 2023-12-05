//  function calcularPrecio(precioEfectivo, tasaInteres) {
//      const precioTarjeta = precioEfectivo * 2;
//      const precio3Cuotas = (precioTarjeta / 3) * ( tasaInteres / 100);
//      const precio6Cuotas = (precioTarjeta / 6) * (10 + tasaInteres / 100);
//      const precio12Cuotas = (precioTarjeta / 12) * (20 + tasaInteres / 100);
//      return {
//        precioEfectivo,
//        precioTarjeta,
//        precio3Cuotas,
//        precio6Cuotas,
//        precio12Cuotas,
//      };
//    };
//    calcularPrecio(20000,15);

//    .to

//   let x = 4
//   let y = 0
 
//   while(y != x){
//     y = parseInt(prompt("Adivina el numero secreto entre 1 y 10"));
//     if(x > y){
//         console.log("El numero ingresado es menor al numero secreto")

//     }else{
//         console.log("El numero ingresado es mayor al numero secreto")
//     }
//   }
//   console.log("Has adivinado el numero secreto")


//  Calculadora
//  3) Crea una calculadora simple que permita al usuario realizar 
//  operaciones de suma, resta, multiplicación y división entre dos 
//  números. Utiliza un bucle do...while para permitir al usuario 
//  realizar múltiples cálculos hasta que decida salir.

// let usuario = "no", a, b, operador, resultado;

// do{
//     a = parseInt(prompt("Ingrese un numero"));
//     operador = prompt("Ingrese una operacion (+-*/)");
//     b = parseInt(prompt("ingrese otro numero"));
     
//     if(operador === "+"){
//         resultado = a + b;
//         console.log("El resultado es : " + resultado);
//     }else if(operador === "-"){
//         resultado = a - b;
//         console.log("El resultado es : " + resultado);
//     }else if(operador === "/"){
//         resultado = a / b;
//         console.log("El resultado es : " + resultado);
//     }else if(operador === "*"){
//         resultado = a * b;
//         console.log("El resultado es : " + resultado);
//     }else{
//         console.log("La operacion indicada no es valida");
//     }
//     usuario = prompt("Desea realizar otra operacion responda por si o por no").toLowerCase();
// }while(usuario === "si")


/*
 let montoInicial, respuestaUsuario = no;

 function simuladorCuotas (montoInicial, numCuotas){
        let valorDeCuota;
        let montoFinal;
        switch(numCuotas){
                case 3: 
                montoFinal = montoInicial * 1.2;
                valorDeCuota = montoFinal/3;
                alert(`Por el prestamo de $${montoInicial} el monto a abonar con interes seria de $${montoFinal}, y el valor de cada cuota seria de $${valorDeCuota}`);
                break;

                case 6: 
                montoFinal = montoInicial * 1.4;
                valorDeCuota = montoFinal/6;
                alert(`Por el prestamo de $${montoInicial} el monto a abonar con interes seria de $${montoFinal}, y el valor de cada cuota seria de :$${valorDeCuota}`);
                break;

                case 12: 
                montoFinal = montoInicial * 1.6;
                valorDeCuota = montoFinal/12;
                alert(`Por el prestamo de $${montoInicial} el monto a abonar con interes seria de $${montoFinal}, y el valor de cada cuota seria de $${valorDeCuota}`);
                break;
        
                default:
                alert("El numero de cuotas indicadas no son validas");
        }
 }

 do{
     let prestamo = 0
     prestamo = parseInt(prompt("Ingrese el valor del prestamo"));
     if( prestamo === NaN || prestamo === "" || prestamo < 1000){
        prestamo = parseInt(prompt("Ha ingresado un monto invalido, ingrese un monto valido para permanecer en la pagina"));
        if (prestamo === NaN || prestamo === "" || prestamo < 1000){
            alert ("Gracias por consultar con nosotros!")
            break; 
        }  
     }
     let numCuotas = parseInt(prompt("Ingrese numero de cuotas, 3, 6 o 12"));
     simuladorCuotas(prestamo, numCuotas);
     respuestaUsuario = prompt("Desea realizar otra consulta? Responda si/no").toLowerCase();
    while (respuestaUsuario !== "si" && respuestaUsuario !== "no") {
        respuestaUsuario = prompt("Ingrese una respuesta válida (si/no)");
    }
    
    if (respuestaUsuario === "no") {
        alert("Gracias por consultar con nosotros!");
    }
} while (respuestaUsuario === "si");
*/

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
    while (respuestaUsuario !== "si" && respuestaUsuario !== "no") {
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

