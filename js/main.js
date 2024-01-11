function setupCarousel(carouselSelector, indicatorSelector) {
    const CAROUSEL = document.querySelector(carouselSelector);
    const carouselIndicators = document.querySelectorAll(indicatorSelector);
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let intervalId;

    const moveCarousel = () => {
        const operation = currentIndex * -100;
        CAROUSEL.style.transform = `translateX(${operation}%)`;
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
    CAROUSEL.addEventListener('mouseover', () => {
        clearInterval(intervalId);
    });

    // Reanudar el intervalo cuando el mouse sale del carrusel
    CAROUSEL.addEventListener('mouseout', () => {
        resetInterval();
    });

    // Solo permitir eventos de arrastre en pantallas más pequeñas
    if (window.innerWidth <= 1023) {
        CAROUSEL.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
        });

        CAROUSEL.addEventListener('mouseup', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startX;
                if (Math.abs(deltaX) > 50) {
                    // Deslizamiento suficientemente grande, cambiar de diapositiva
                    handleSlideChange(deltaX > 0 ? -1 : 1);
                }
                isDragging = false;
            }
        });

        CAROUSEL.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startX;
                const operation = (currentIndex * -100) + (deltaX / window.innerWidth) * 100;
                CAROUSEL.style.transform = `translateX(${operation}%)`;
            }
        });

        CAROUSEL.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                moveCarousel();
            }
        });
    }

    CAROUSEL.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    CAROUSEL.addEventListener('touchmove', (e) => {
        const deltaX = e.touches[0].clientX - startX;
        const operation = (currentIndex * -100) + (deltaX / window.innerWidth) * 100;
        CAROUSEL.style.transform = `translateX(${operation}%)`;
    });

    CAROUSEL.addEventListener('touchend', (e) => {
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
    const ABRIR = document.querySelector("#open-menu");
    const CERRAR = document.querySelector("#close-menu");
    const MENU = document.querySelector("#menu");
    const NAV = document.querySelector("#nav");
    const ABRIR2 = document.querySelector("#open-menu-full");
    const MENU_CONTAINER = document.querySelector("#menu-container")
    let intervalId;

    const ABRIR_MENU = () => {
        NAV.style.display = 'block';
        if (window.innerWidth < 1024){
        // Espera a que termine la transición antes de aplicar la transformación del menú
        setTimeout(() => {
            MENU.style.transition = 'transform 0.3s';
            MENU.style.transform = 'translateX(0)';
        }, 50); // 50 milisegundos de retraso antes de aplicar la transición
        }
        // Detener el intervalo del carrusel cuando se abre el menú
        clearInterval(intervalId);
    };
    
    const CERRAR_MENU = () => {
        if (window.innerWidth < 1024) {
            MENU.style.transition = 'transform 0.3s';
            MENU.style.transform = 'translateX(-100%)';
        }
    
        // Espera a que termine la transición antes de ocultar el elemento
        setTimeout(() => {
            NAV.style.display = 'none';
        }, 300); // 300 milisegundos, ajusta según la duración de tu transición
    
        // Reanudar el intervalo del carrusel cuando se cierra el menú
        intervalId = setInterval(nextSlide, intervalDuration);
    };
      
    window.addEventListener('resize', () => {
        // Al cambiar el tamaño de la ventana, verifica si estás en mobile o desktop
        if (window.innerWidth >= 1024) {
            // Si es desktop, elimina los estilos modificados
            MENU.style.transition = '';
            MENU.style.transform = '';
        } else {
            // Si es mobile y el menú está abierto, establece translateX en 0
            if (NAV.style.display === 'block') {
                MENU.style.transition = 'transform 0.3s';
                MENU.style.transform = 'translateX(0)';
            }
        }
    });
 
    // Agregar evento de clic al documento para cerrar el menú cuando se hace clic fuera
    document.addEventListener('click', (event) => {
        const IS_CLICK_INSIDE_MENU = MENU_CONTAINER.contains(event.target);
        const IS_CLICK_ON_OPEN_BUTTON = ABRIR.contains(event.target);

        // Cierra el menú si se hace clic fuera y el menú está abierto
        if (!IS_CLICK_INSIDE_MENU && !IS_CLICK_ON_OPEN_BUTTON) {
            CERRAR_MENU();
        }
    });

    // Evitar que el clic en el menú propague hasta el documento
    MENU.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    CERRAR.addEventListener("click", CERRAR_MENU);
    ABRIR.addEventListener("click", ABRIR_MENU);
    ABRIR2.addEventListener("click", (event) => {
        // Evitar que el clic en abrir2 se propague al documento
        event.stopPropagation();
        ABRIR_MENU();
    });
});

// CARRUSEL DE CATEGORIAS HOME

const CAROUSEL_CONTAINER = document.querySelector("#carousel-cat-container");
const CAROUSEL_LIST = document.querySelector("#carousel-categories");
const PREV_BTN = document.querySelector("#carousel-btn-prev");
const NEXT_BTN = document.querySelector("#carousel-btn-next");

let currentIndexCustom = 0;
let startXCustom = 0;
let draggingCustom = false;

function handleTouchStart(e) {
  draggingCustom = true;
  startXCustom = e.touches[0].clientX;
}

function handleTouchMove(e) {
  if (!draggingCustom) return;

  const deltaX = e.touches[0].clientX - startXCustom;
  let translateValue = -currentIndexCustom * 210 + deltaX;

  // Verificar el ancho de la pantalla antes de aplicar el desplazamiento máximo
  if (window.innerWidth > 1023) {
    translateValue = Math.max(-420, Math.min(0, translateValue));
  } else {
    translateValue = Math.max(-2030, Math.min(0, translateValue));
  }

  CAROUSEL_LIST.style.transition = "none";
  CAROUSEL_LIST.style.transform = `translateX(${translateValue}px)`;
}

function handleTouchEnd(e) {
  if (!draggingCustom) return;

  draggingCustom = false;
  CAROUSEL_LIST.style.transition = "transform 0.3s ease-in-out";

  // Restablecer el valor de startXCustom a 0
  startXCustom = 0;

  if (startXCustom > 0 && e.changedTouches[0].clientX - startXCustom > 50) {
    if (currentIndexCustom > 0) currentIndexCustom--;
  } else if (startXCustom < 0 && e.changedTouches[0].clientX - startXCustom < -50) {
    if (currentIndexCustom < CAROUSEL_LIST.querySelectorAll("li").length - 1) currentIndexCustom++;
  }

  let translateValue = -currentIndexCustom * 210;

  // Ajustar el valor máximo de desplazamiento
  if (window.innerWidth > 1023) {
    translateValue = Math.max(-420, Math.min(0, translateValue));
  } else {
    translateValue = Math.max(-2030, Math.min(0, translateValue));
  }

  CAROUSEL_LIST.style.transform = `translateX(${translateValue}px)`;
}

// Añadir el evento de redimensionamiento para actualizar el comportamiento en tiempo real
window.addEventListener("resize", function () {
  handleTouchMove({
    touches: [{ clientX: startXCustom }],
  });
});

CAROUSEL_LIST.addEventListener("touchstart", handleTouchStart);
CAROUSEL_LIST.addEventListener("touchmove", handleTouchMove);
CAROUSEL_LIST.addEventListener("touchend", handleTouchEnd);

NEXT_BTN.addEventListener("click", function () {
  if (currentIndexCustom < CAROUSEL_LIST.querySelectorAll("li").length - 1) {
    currentIndexCustom++;
    let translateValue = -currentIndexCustom * 210;

    // Ajustar el valor máximo de desplazamiento
    if (window.innerWidth > 1023) {
      translateValue = Math.max(-420, translateValue);
    } else {
      translateValue = Math.max(-2030, translateValue);
    }

    CAROUSEL_LIST.style.transition = "transform 0.3s ease-in-out";
    CAROUSEL_LIST.style.transform = `translateX(${translateValue}px)`;
  }
});

PREV_BTN.addEventListener("click", function () {
  if (currentIndexCustom > 0) {
    currentIndexCustom--;
    let translateValue = -currentIndexCustom * 210;

    // Ajustar el valor máximo de desplazamiento
    if (window.innerWidth > 1023) {
      translateValue = Math.max(-420, translateValue);
    } else {
      translateValue = Math.max(-2030, translateValue);
    }

    CAROUSEL_LIST.style.transition = "transform 0.3s ease-in-out";
    CAROUSEL_LIST.style.transform = `translateX(${translateValue}px)`;
  }
});




// FUNCION CONSTRUCTORA PRODUCTOS

function Producto(id, nombre, precio, imagenes, detalles, categoria, subcategoria, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagenes = imagenes;
    this.detalles = detalles;
    this.categoria = categoria;
    this.subcategoria = subcategoria;
    this.stock = stock;
  }

  // Creando instancias de Producto manualmente
const PRODUCTO_1 = new Producto(1, "Placa de Video Colorful GTX1650 4GB NB 4GD6-V", 332199, ['../img/products/id-1/img-1.webp', '../img/products/id-1/img-2.webp'],["Placa de Video Colorful GTX 1650 4GB GDDR6 NB con modelo GTX1650 4GB NB 4GD6-V y chipset NVIDIA GeForce® GTX 1650. Ofrece un rendimiento con reloj de núcleo de 1410Mhz / 1710Mhz y memoria efectiva de 12Gbps. Con 4GB de memoria GDDR6, interfaz de memoria de 128 bits y soporte para DirectX 12.1 y OpenGL 4.5. Incluye puertos 1x DVI-D, 1x HDMI y 1x DisplayPort 1.4."], "Computacion", "Placas de video",3);
const PRODUCTO_2 = new Producto(2, "Placa de Video Colorful RTX2060 NB V2 6GB REACONDICIONADA", 199999, ['../img/products/id-2/img-1.webp', '../img/products/id-2/img-2.webp'],["Esta placa reacondicionada se usó en minería durante 3 meses, fue probada en juegos para verificar su rendimiento y tiene una garantía de 3 meses. No incluye la caja original. Nvidia, líder en fabricación de placas de video, asegura calidad para una experiencia óptima en tu computadora. Con 1920 núcleos, ofrece una interfaz sorprendente y es ideal para el procesamiento de tecnologías modernas con grandes volúmenes de datos. Modelo: Colorful RTX2060 NB V2 6GB."], "Computacion", "Placas de video",4);
const PRODUCTO_3 = new Producto(3, "Placa de Video Colorful GTX1660 6GB Super REACONDICIONADA", 180000, '../img/products/id-3/img-1.webp',"La Colorful GeForce GTX 1660 SUPER NB 6G V2-V tiene 1408 CUDA Cores, 6GB GDDR6, reloj base de 1530Mhz, boost de 1785Mhz, diseño de 2 ranuras, conector de alimentación de 8 pines, puertos DP+HDMI+DVI, y tecnologías como DirectX 12.1/4.5, Ansel y GPU Boost. Con un solo ventilador y tubería de calor, sus dimensiones son 222x126x42mm, pesa 0.71KG (N.W) e incluye garantía y manual.", "Computacion", "Placas de video",4);
const PRODUCTO_4 = new Producto(4, "Procesador Intel Core i3 12100F (1700)", 220789, '../img/products/id-4/img-1.webp', "El procesador Intel Core i3 12100F (1700) ofrece un rendimiento superior para tareas de productividad y entretenimiento en tu computadora de escritorio. Con tecnología avanzada, asegura eficiencia en aplicaciones y transferencia de datos, potenciando tu experiencia informática.", "Computacion", "Procesadores", 6);
const PRODUCTO_5 = new Producto(5, "Procesador Intel Core i5 11400 (1200)", 289000, '../img/products/id-5/img-1.webp', "El procesador Intel Core i5 11400 (1200) ofrece un rendimiento destacado para productividad y entretenimiento en tu PC. Con 6 núcleos y 12 hilos, alcanza una frecuencia turbo máxima de 4.40 GHz. Incluye 12 MB de caché inteligente y gráficos Intel® UHD 730. Es compatible con memoria DDR4-3200 y ofrece resolución 4K a 60Hz.", "Computacion", "Procesadores", 3);
const PRODUCTO_6 = new Producto(6, "Procesador AMD Ryzen 3 4100", 151850, ['../img/products/id-6/img-1.webp', '../img/products/id-6/img-2.webp'], "El procesador AMD Ryzen 3 4100 ofrece un rendimiento potente sin GPU integrada. Con 4 núcleos y 8 hilos, alcanza frecuencias de reloj de 3.8 GHz a 4.0 GHz. Equipado con 4 MB de caché y compatible con memoria DDR4 hasta 128GB. Además, es desbloqueado para overclocking, viene con un air cooler y tiene un TDP de 65W.", "Computacion", "Procesadores", 4);
const PRODUCTO_7 = new Producto(7, "Procesador Ryzen 5 5600g", 296760, ['../img/products/id-7/img-1.webp', '../img/products/id-7/img-2.webp'], "El AMD Ryzen 5 5600G, parte de la serie 5000, ofrece un rendimiento potente con 6 núcleos, 12 hilos y frecuencia de hasta 4.4 GHz. Su gráfica Radeon 7 Graphics brinda un rendimiento excepcional. Con características como caché L3 de 16MB, desbloqueo y tecnología DDR4, es ideal para diversas tareas. Compatible con chipsets 5xx y B450. SKU 413751.", "Computacion", "Procesadores", 2);
