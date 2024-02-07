let carrito = [];
const PRODUCTOS = [];
const CAROUSEL_TOP_PRODUCTS_CONTAINER = document.querySelector("#carousel-top-prods");
const PC_CAT_BUTTONS = document.querySelectorAll(".computacion");
const ORIGINAL_MAIN = document.querySelector("#main");
const LOGO_ICON = document.querySelector("#logo");
const SUGGESTED_PRODUCTS_CONTAINER = document.querySelector("#suggested-products");

// Función para cargar productos y inicializar la aplicación
async function cargarProductos() {
    try {
        const response = await fetch('./productos.json');
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo JSON. Código de error: ${response.status}`);
        }
        const DATOS = await response.json();
        PRODUCTOS.length = 0;
        PRODUCTOS.push(...DATOS);
        console.log(DATOS);
        // función para mostrar productos en el carrusel
        mostrarProductosEnCarrusel();
        PC_CAT_BUTTONS.forEach(button => {
            button.addEventListener("click", () => {
                if (originalCarouselState === null) {
                    // Guardar el estado original del carrusel antes de cambiar a la categoría "Computacion"
                    originalCarouselState = {
                        transform: CAROUSEL_TOP_PRODUCTS_CONTAINER.style.transform
                    };
                }
                let newArray = filterByCategory("computacion", PRODUCTOS);
                let nuevoContenido = '';
                newArray.forEach(producto => {
                    console.log(producto);
                    nuevoContenido += `<h2 class="py-10">${producto.nombre}</h2>
                                      <p class="py-10">${producto.precio}</p>`;
                });
                // Reemplaza el contenido del elemento utilizando innerHTML
            });
        });
        document.addEventListener("keyup", e => {
            let searchedProducts;
            let searchTerm = e.target.value.trim().toLowerCase();
            // Verificar si el evento keyup se originó en el campo de búsqueda
            if (e.target.matches("#search")) {
                // Verificar si la cadena de búsqueda no está vacía
                if (searchTerm !== "") {
                    // Filtrar los productos según la entrada de búsqueda
                    searchedProducts = PRODUCTOS.filter(producto =>
                        producto.nombre.toLowerCase().includes(searchTerm)
                    );
                    // Mostrar los productos sugeridos en la página
                    showSuggestedProducts(searchedProducts, searchTerm);
                } else {
                    // Ocultar el contenedor de productos sugeridos y limpiar el array
                    hideSuggestedProducts(searchedProducts);
                }
            }
        });
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error);
    }
}
document.addEventListener('DOMContentLoaded', function(){
    cargarProductos();
})

console.log(PRODUCTOS[0]);

function hideSuggestedProducts(suggestedProducts) {
    // Ocultar el contenedor de productos sugeridos
    SUGGESTED_PRODUCTS_CONTAINER.style.display = "none";

    // Limpiar el array de productos sugeridos
    suggestedProducts = [];
    return suggestedProducts;
}

function showSuggestedProducts(array, textEntry) {
    // Limpiar el contenedor de productos sugeridos antes de agregar la nueva lista

    SUGGESTED_PRODUCTS_CONTAINER.innerHTML = '';
    let listaDeProductos = document.createElement("ul");
    let item;
    // Mostrar un mensaje en caso de no encontrar un producto
    if (array.length === 0) {
        item = document.createElement("li");
        item.classList = "flex w-full border-b cursor-pointer hover:bg-gray-100";
        item.innerHTML = `
            <p class ="p-4 text-center">Lo siento no hay productos para: "${textEntry}" 
            </p>
        `;
        console.log(item.innerHTML);    
        listaDeProductos.appendChild(item);
    } else {
        // Recorrer el array de productos y crear un elemento li por cada producto
        array.forEach(function (producto) {
            // Crear un elemento li para cada producto
            item = document.createElement("li");
            item.classList = "flex w-full border-b cursor-pointer hover:bg-gray-100";

            // Asignar el contenido HTML al elemento li
            item.innerHTML = `
            <a id="${producto.id}" class="p-3 flex items-center suggested-product-item" href="./product.html?id=${producto.id}">
                <div class="w-20 h-20 p-2">
                    <img class="h-full w-full object-contain" src=".${producto.imagenes[0]}" alt ="${producto.nombre}">
                </div>
                <p>${producto.nombre}</p>
            </a>
        `;

            // Agregar un evento de clic al elemento de producto sugerido para redirigir a la página individual del producto
            item.addEventListener("click", function (event) {
                event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
                window.location.href = `./pages/product.html?id=${producto.id}`; // Redirigir a la página individual del producto
            });
            console.log(item);
            // Agregar el elemento li a la lista desordenada
            listaDeProductos.appendChild(item);
        });

        // Agregar la lista de productos al contenedor en el HTML
        
    }
    SUGGESTED_PRODUCTS_CONTAINER.appendChild(listaDeProductos);
    SUGGESTED_PRODUCTS_CONTAINER.style.display = "block";
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateRandomNumbers(min, max, count) {
    const numbers = [];
    for (let i = min; i <= max; i++) {
        numbers.push(i);
    }
    shuffleArray(numbers);
    return numbers.slice(0, count);
}


// Función para mostrar productos en el carrusel
function mostrarProductosEnCarrusel() {
    // Puedes acceder a PRODUCTOS aquí y realizar cualquier operación necesaria
    const RANDOM_NUMBERS = generateRandomNumbers(0, PRODUCTOS.length - 1, 12);
    // Ejemplo: Mostrar productos en el carrusel
    for (let i = 1; i < 13; i++) {
        let producto = PRODUCTOS[RANDOM_NUMBERS[i - 1]];
        let newProduct = createProductElement(producto.id, producto.imagenes[0], producto.nombre, producto.precio);
        const div = document.createElement('div');
        div.innerHTML = newProduct;
        div.classList.add("carousel-product-item");

        CAROUSEL_TOP_PRODUCTS_CONTAINER.appendChild(div);
    }
}



function createProductElement(id, imgSrc, title, discountPrice) {
    let discount = 50;
    let realPrice = discountPrice * 2;
    let savePrice = realPrice - discountPrice;
    savePrice = savePrice.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    realPrice = realPrice.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    discountPrice = discountPrice.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return `
    <div id="${id}" href="" class="h-full w-full block">
      <article class="carousel-product-card">
        <div class ="card-product-img-container">
            <div class ="container-img-product">
                <img class="carousel-product-img " src=".${imgSrc}" alt="${title}">
            </div>
            <div class="saved-price">
                <span>AHORRÁS $ ${savePrice}</span>
            </div>
        </div>
        <h6 class="card-product-card-title">${title}</h6>
        <div class="carousel-product-card-inside">
          <div class="carousel-product-text">
            <span class="carousel-product-old-price">$${realPrice}</span>
            <p class="carousel-product-price">$${discountPrice}</p>
          </div>
          <div>
            <p class="carousel-product-off">${discount}% off</p>
          </div>
        </div>
      </article>
    </div>
  `;
}

function cargarProductosComputacion(PRODUCTOS) {
    PRODUCTOS.forEach((producto) => ({

    }))

}

const CAROUSEL_TOP_PRODS_PREV = document.querySelector("#carousel-products-btn-prev");
const CAROUSEL_TOP_PRODS_NEXT = document.querySelector("#carousel-products-btn-next");

let carouselPosition = -33.3;

CAROUSEL_TOP_PRODS_NEXT.addEventListener("click", () => {
    carouselPosition -= 33.3;
    if (carouselPosition < -99) {
        carouselPosition = 0;
    }
    CAROUSEL_TOP_PRODUCTS_CONTAINER.style.transform = `translateX(${carouselPosition}%)`;
});
CAROUSEL_TOP_PRODS_PREV.addEventListener("click", () => {
    carouselPosition += 33.3;
    if (carouselPosition > 0) {
        carouselPosition = -66.6;
    }
    CAROUSEL_TOP_PRODUCTS_CONTAINER.style.transform = `translateX(${carouselPosition}%)`;
});

// Obtener el contenedor del carrusel
const carouselContainer = document.getElementById('carousel-container');

function filterByCategory(category, PRODUCTOS) {
    let newArrayByCategory = PRODUCTOS.filter(producto => producto.categoria.toLowerCase() === category);
    console.log(newArrayByCategory);
    return newArrayByCategory;
}

function setupCarousel(carouselSelector, indicatorSelector) {
    const CAROUSEL = document.querySelector(carouselSelector);
    const carouselIndicators = document.querySelectorAll(indicatorSelector);
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let intervalId;

    const moveCarousel = () => {
        let operation = currentIndex * -100;
        CAROUSEL.style.transform = `translateX(${operation}%)`;
        CAROUSEL.style.transition = 'transform 0.3s ease-in-out';
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

    const ABRIR_MENU = () => {
        NAV.style.display = 'block';
        if (window.innerWidth < 1024) {
            // Espera a que termine la transición antes de aplicar la transformación del menú
            setTimeout(() => {
                MENU.style.transition = 'transform 0.3s';
                MENU.style.transform = 'translateX(0)';
            }, 50); // 50 milisegundos de retraso antes de aplicar la transición
        }
        // Detener el intervalo del carrusel cuando se abre el menú
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
let lastTranslateX = 0;

function handleTouchStart(event) {
    startXCustom = event.touches[0].clientX - lastTranslateX;
}

function handleTouchMove(event) {
    const deltaX = event.touches[0].clientX - startXCustom;
    lastTranslateX = -currentIndexCustom * 8.333333 + deltaX;

    const minTranslateX = window.innerWidth > 1023 ? -33.333332 : -41.666666;
    lastTranslateX = Math.max(minTranslateX, Math.min(0, lastTranslateX));

    CAROUSEL_LIST.style.transition = "none";
    CAROUSEL_LIST.style.transform = `translateX(${lastTranslateX}%)`;
}

function handleTouchEnd(event) {
    draggingCustom = false;
    CAROUSEL_LIST.style.transition = "transform 0.3s ease-in-out";

    const deltaX = event.changedTouches[0].clientX - startXCustom;

    if (Math.abs(deltaX) > 50) {
        handleSlideChange(deltaX > 0 ? -1 : 1);
    }

    lastTranslateX = -currentIndexCustom * 8.333333;

    const minTranslateX = window.innerWidth > 1023 ? -33.333332 : -41.666666;
    lastTranslateX = Math.max(minTranslateX, Math.min(0, lastTranslateX));

    CAROUSEL_LIST.style.transform = `translateX(${lastTranslateX}%)`;
}

window.addEventListener("resize", function () {
    handleTouchMove({
        touches: [{ clientX: startXCustom }],
    });
});

CAROUSEL_LIST.addEventListener("touchstart", handleTouchStart);
CAROUSEL_LIST.addEventListener("touchmove", handleTouchMove);
CAROUSEL_LIST.addEventListener("touchend", handleTouchEnd);

NEXT_BTN.addEventListener("click", function () {
    if (currentIndexCustom < 9) {
        currentIndexCustom++;
    } else {
        currentIndexCustom = 0;
    }
    updateCarousel();
});

PREV_BTN.addEventListener("click", function () {
    if (currentIndexCustom > 0) {
        currentIndexCustom--;
    } else {
        currentIndexCustom = 9;
    }
    updateCarousel();
});

function handleSlideChange(direction) {
    if (direction === 1 && currentIndexCustom < 9) {
        currentIndexCustom++;
    } else if (direction === -1 && currentIndexCustom > 0) {
        currentIndexCustom--;
    }
    updateCarousel();
}

function updateCarousel() {
    lastTranslateX = -currentIndexCustom * 8.333333;

    const minTranslateX = window.innerWidth > 1023 ? -100 : -100;
    lastTranslateX = Math.max(minTranslateX, Math.min(0, lastTranslateX));

    CAROUSEL_LIST.style.transition = "transform 0.3s ease-in-out";
    CAROUSEL_LIST.style.transform = `translateX(${lastTranslateX}%)`;
}

// Función para restaurar la posición
function restoreToBeginning() {
    currentIndexCustom = 0;
    updateCarousel();
}

const TOP_PRODUCTS_CONTAINER = document.querySelector("#carrusel-top-prods");
const PAYMENT_METHODS_BUTTON = document.querySelector("#payment-methods-button");

PAYMENT_METHODS_BUTTON.addEventListener('click', function () {
    // Muestra la alerta de SweetAlert
    Swal.fire({
        title: "Medios de pago",
        width: 600,
        html: `
        
          <p class="text-sm pb-6 pt-4 text-stone-700 text-left border-t">Podés pagar en efectivo, débito y crédito.</p>
          <p class="text-sm pb-6 text-stone-700 text-left">Tenés 3, 6, 12 y 18 cuotas con todas las tarjetas de crédito bancarias Visa y Mastercard.</p>
          <div class="flex gap-5 justify-center mt-2 flex-wrap">
            <img  src="./img/payment-methods/visa.svg" class="h-6 object-cover" alt="Imagen 1">
            <img src="./img/payment-methods/mastercard.svg" class="h-6 object-cover" alt="Imagen 2">
            <img src="./img/payment-methods/american-express.svg" class="h-6 object-cover" alt="Imagen 3">
            <img src="./img/payment-methods/tarjeta-naranja.webp" class="h-6 object-cover" alt="Imagen 4">
            <img src="./img/payment-methods/mercado-pago.webp" class="h-6 object-cover" alt="Imagen 5">
            <img src="./img/payment-methods/pago-facil.svg" class="h-6 object-cover" alt="Imagen 6">
            <img src="./img/payment-methods/rapipago.svg" class="h-6 object-cover" alt="Imagen 7">
          </div>
        `,
        showConfirmButton: true,
        showCancelButton: false,
        showCloseButton: true,
        showClass: {
            popup: `
            
            `
        },
        hideClass: {
            popup: `
              
            `
        },
        didOpen: () => {
            const HEADER_MAIN = document.querySelector("#header-main");
            HEADER_MAIN.style.marginLeft = '-8px';
        },
        willClose: () => {
            const HEADER_MAIN = document.querySelector("#header-main");
            HEADER_MAIN.style.marginLeft = '0';
        }
    });
});