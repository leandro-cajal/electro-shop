function setupCarousel(carouselSelector, indicatorSelector) {
    const carousel = document.querySelector(carouselSelector);
    const carouselIndicators = document.querySelectorAll(indicatorSelector);
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let intervalId;

    const moveCarousel = () => {
        const operation = currentIndex * -100;
        carousel.style.transform = `translateX(${operation}%)`;
        updateIndicators();
    };

    const updateIndicators = () => {
        carouselIndicators.forEach((indicator, i) => {
            indicator.style.backgroundColor = i === currentIndex ? 'rgb(68, 64, 60)' : '';
        });
    };

    const handleSlideChange = (direction) => {
        currentIndex = (currentIndex + direction + carouselIndicators.length) % carouselIndicators.length;
        moveCarousel();
        resetInterval();
    };

    const nextSlide = () => {
        handleSlideChange(1);
    };

    const resetInterval = () => {
        clearInterval(intervalId);
        intervalId = setInterval(nextSlide, intervalDuration);
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
        resetInterval();
    });

    // Solo permitir eventos de arrastre en pantallas más pequeñas
    if (window.innerWidth <= 1023) {
        carousel.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
        });

        carousel.addEventListener('mouseup', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startX;
                if (Math.abs(deltaX) > 50) {
                    // Deslizamiento suficientemente grande, cambiar de diapositiva
                    handleSlideChange(deltaX > 0 ? -1 : 1);
                }
                isDragging = false;
            }
        });

        carousel.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startX;
                const operation = (currentIndex * -100) + (deltaX / window.innerWidth) * 100;
                carousel.style.transform = `translateX(${operation}%)`;
            }
        });

        carousel.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                moveCarousel();
            }
        });
    }

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchmove', (e) => {
        const deltaX = e.touches[0].clientX - startX;
        const operation = (currentIndex * -100) + (deltaX / window.innerWidth) * 100;
        carousel.style.transform = `translateX(${operation}%)`;
    });

    carousel.addEventListener('touchend', (e) => {
        const deltaX = e.changedTouches[0].clientX - startX;

        if (Math.abs(deltaX) > 50) {
            // Deslizamiento suficientemente grande, cambiar de diapositiva
            handleSlideChange(deltaX > 0 ? -1 : 1);
        }
    });

    // Agregar eventos de clic a los indicadores para cambiar manualmente las diapositivas
    carouselIndicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            currentIndex = i;
            moveCarousel();
            resetInterval();
        });
    });

    // Iniciar carrusel
    moveCarousel();
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
    const abrir2 = document.querySelector("#open-menu-full");
    const menuContainer = document.querySelector("#menu-container")
    let intervalId;

    const abrirMenu = () => {
        nav.style.display = 'block';
        if (window.innerWidth < 1024){
        // Espera a que termine la transición antes de aplicar la transformación del menú
        setTimeout(() => {
            menu.style.transition = 'transform 0.3s';
            menu.style.transform = 'translateX(0)';
        }, 50); // 50 milisegundos de retraso antes de aplicar la transición
        }
        // Detener el intervalo del carrusel cuando se abre el menú
        clearInterval(intervalId);
    };

    const cerrarMenu = () => {
        if (window.innerWidth < 1024) {
            menu.style.transition = 'transform 0.3s';
            menu.style.transform = 'translateX(-100%)';
        }
    
        // Espera a que termine la transición antes de ocultar el elemento
        setTimeout(() => {
            nav.style.display = 'none';
        }, 300); // 300 milisegundos, ajusta según la duración de tu transición
    
        // Reanudar el intervalo del carrusel cuando se cierra el menú
        intervalId = setInterval(nextSlide, intervalDuration);
    };
    
    // ...
    
    window.addEventListener('resize', () => {
        // Al cambiar el tamaño de la ventana, verifica si estás en mobile o desktop
        if (window.innerWidth >= 1024) {
            // Si es desktop, elimina los estilos modificados
            menu.style.transition = '';
            menu.style.transform = '';
        } else {
            // Si es mobile y el menú está abierto, establece translateX en 0
            if (nav.style.display === 'block') {
                menu.style.transition = 'transform 0.3s';
                menu.style.transform = 'translateX(0)';
            }
        }
    });
 
    // Agregar evento de clic al documento para cerrar el menú cuando se hace clic fuera
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = menuContainer.contains(event.target);
        const isClickOnOpenButton = abrir.contains(event.target);

        // Cierra el menú si se hace clic fuera y el menú está abierto
        if (!isClickInsideMenu && !isClickOnOpenButton) {
            cerrarMenu();
        }
    });

    // Evitar que el clic en el menú propague hasta el documento
    menu.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    cerrar.addEventListener("click", cerrarMenu);
    abrir.addEventListener("click", abrirMenu);
    abrir2.addEventListener("click", (event) => {
        // Evitar que el clic en abrir2 se propague al documento
        event.stopPropagation();
        abrirMenu();
    });
});

// CARRUSEL DE CATEGORIAS HOME

document.addEventListener("DOMContentLoaded", function () {
    // Selecciona elementos del DOM
    const prevButton = document.getElementById("carousel-btn-prev");
    const nextButton = document.getElementById("carousel-btn-next");
    const carouselContainer = document.getElementById("carousel-cat-container");
    const carouselList = document.getElementById("carousel-categories");

    // Calcula la anchura de un elemento y el margen
    const itemWidth = carouselList.firstElementChild.clientWidth + 16; // Incluye el margen de 4px de cada lado
    const itemsToShow = 6; // Número de elementos a mostrar en el carrusel
    const scrollIncrement = itemWidth * 2; // Desplazamiento en píxeles al hacer clic en los botones

    // Configura el evento click para los botones previo y siguiente
    prevButton.addEventListener("click", function () {
      scrollCarousel("prev");
    });

    nextButton.addEventListener("click", function () {
      scrollCarousel("next");
    });

    // Función para desplazar el carrusel
    function scrollCarousel(direction) {
      const currentScroll = carouselContainer.scrollLeft;

      if (direction === "prev") {
        carouselContainer.scrollLeft = Math.max(0, currentScroll - scrollIncrement);
      } else {
        carouselContainer.scrollLeft = Math.min(carouselList.scrollWidth - carouselContainer.clientWidth, currentScroll + scrollIncrement);
      }
    }
  });