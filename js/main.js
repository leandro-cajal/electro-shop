/*let montoInicial, respuestaUsuario;

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

} while (respuestaUsuario === "si");*/


'use strict';

function setupCarousel(carouselSelector, indicatorSelector) {
    const carousel = document.querySelector(carouselSelector);
    const carouselIndicators = document.querySelectorAll(indicatorSelector);
    let currentIndex = 0;

    const moveCarousel = (index) => {
        let operation = index * -100;
        carousel.style.transform = `translateX(${operation}%)`;

        // restablecer todos los indicadores a su estado original
        carouselIndicators.forEach((indicator) => {
            indicator.classList.remove('bg-stone-700');
        });

        // aplicar el fondo al indicador correspondiente
        carouselIndicators[index].classList.add('bg-stone-700');
    };

    carouselIndicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            currentIndex = i;
            moveCarousel(currentIndex);
        });
    });

    // inicializar swiper.js solo si el ancho de la ventana es menor o igual a 768px
    if (window.innerWidth <= 768) {
        new Swiper(carousel, {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            allowTouchMove: true,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false,
            },
        });
    }

    // funcion para mover automaticamente el carrusel cada 8 segundos
    const autoMoveCarousel = () => {
        currentIndex = (currentIndex + 1) % carouselIndicators.length;
        moveCarousel(currentIndex);
    };

    // configurar intervalo para el movimiento automatico cada 8 segundos
    let intervalId = setInterval(autoMoveCarousel, 8000);

    // detener el intervalo cuando el mouse esta sobre el carrusel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });

    // reanudar el intervalo cuando el mouse sale del carrusel
    carousel.addEventListener('mouseleave', () => {
        intervalId = setInterval(autoMoveCarousel, 8000);
    });
}

setupCarousel('.carousel', '.carousel-indicator');
setupCarousel('.carousel-mobile', '.mobile-carousel-indicator');
