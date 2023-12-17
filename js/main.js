function setupCarousel(carouselSelector, indicatorSelector) {
    const carousel = document.querySelector(carouselSelector);
    const carouselIndicators = document.querySelectorAll(indicatorSelector);
    let currentIndex = 0;
    let intervalId;

    const moveCarousel = (index) => {
        let operation = index * -100;
        carousel.style.transform = `translateX(${operation}%)`;

        // restablecer todos los indicadores a su estado original
        carouselIndicators.forEach((indicator) => {
            indicator.style.backgroundColor = '';
        });

        // aplicar el fondo al indicador correspondiente
        carouselIndicators[index].style.backgroundColor = 'rgb(68, 64, 60)';
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % carouselIndicators.length;
        moveCarousel(currentIndex);
    };

    // Iniciar el intervalo para cambiar automáticamente las diapositivas cada 8 segundos
    const intervalDuration = 8000; // 8 segundos
    intervalId = setInterval(nextSlide, intervalDuration);

    // Detener el intervalo cuando el mouse está sobre el carrusel
    carousel.addEventListener('mouseover', () => {
        clearInterval(intervalId);
    });

    // Reanudar el intervalo cuando el mouse sale del carrusel
    carousel.addEventListener('mouseout', () => {
        intervalId = setInterval(nextSlide, intervalDuration);
    });

    // Agregar eventos de clic a los indicadores para cambiar manualmente las diapositivas
    carouselIndicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            currentIndex = i;
            moveCarousel(currentIndex);

            // Restablecer el intervalo después de hacer clic en un indicador
            clearInterval(intervalId);
            intervalId = setInterval(nextSlide, intervalDuration);
        });
    });
}

// Iniciar carruseles
setupCarousel('.carousel', '.carousel-indicator');
setupCarousel('.carousel-mobile', '.mobile-carousel-indicator');


//MENU HAMBURGUESA


document.addEventListener('DOMContentLoaded', () => {
    const abrir = document.querySelector("#open-menu");
    const cerrar = document.querySelector("#close-menu");
    const menu = document.querySelector("#menu");
    const nav = document.querySelector("#nav");

    let intervalId;

    abrir.addEventListener("click", () => {
        nav.style.display = 'block';

        // Espera a que termine la transición antes de aplicar la transformación del menú
        setTimeout(() => {
            menu.style.transition = 'transform 0.3s';
            menu.style.transform = 'translateX(0)';
        }, 50); // 50 milisegundos de retraso antes de aplicar la transición

        // Detener el intervalo del carrusel cuando se abre el menú
        clearInterval(intervalId);
    });

    cerrar.addEventListener("click", () => {
        menu.style.transition = 'transform 0.3s';
        menu.style.transform = 'translateX(-100%)';

        // Espera a que termine la transición antes de ocultar el elemento
        setTimeout(() => {
            nav.style.display = 'none';
        }, 300); // 300 milisegundos, ajusta según la duración de tu transición

        // Reanudar el intervalo del carrusel cuando se cierra el menú
        intervalId = setInterval(nextSlide, intervalDuration);
    });

    // Agregar evento de clic al documento para cerrar el menú cuando se hace clic fuera
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = menu.contains(event.target);
        const isClickOnOpenButton = abrir.contains(event.target);
        
        // Cierra el menú si se hace clic fuera y el menú está abierto
        if (!isClickInsideMenu && !isClickOnOpenButton) {
            menu.style.transition = 'transform 0.3s';
            menu.style.transform = 'translateX(-100%)';

            // Espera a que termine la transición antes de ocultar el elemento
            setTimeout(() => {
                nav.style.display = 'none';
            }, 300); // 300 milisegundos, ajusta según la duración de tu transición

            // Reanudar el intervalo del carrusel cuando se cierra el menú
            intervalId = setInterval(nextSlide, intervalDuration);
        }
    });

    // Evitar que el clic en el menú propague hasta el documento
    menu.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});