/**
 * SCRIPT INTERACTIVO DE MI WEB (proyecto.js)
 * 
 * Acá manejo todo lo que pasa en el navegador del usuario:
 * - Sumar y restar la cantidad de los productos en las tarjetas.
 * - Guardar las cosas en el carrito usando el 'localStorage' para que no se borren.
 * - Saber si el usuario inició sesión revisando las cookies desde JavaScript.
 * - Crear y animar las alertas flotantes (toasts) de color naranja cuando agrega algo.
 * - Dibujar el panel del carrito al lado derecho con el total de la compra y el botón de pagar.
 */

// ==========================================
// 1. BOTONES PARA SUMAR Y RESTAR CANTIDADES
// ==========================================

// Variable para la tarjeta destacada principal
let cantidad = 0;

// Busco los elementos de la tarjeta principal por su ID único
const botonSubir = document.getElementById('b-mas');
const botonBajar = document.getElementById('b-menos');
const mostrar = document.getElementById('cantidad');

// Al darle click al botón +, sumo 1 a mi variable y la muestro en la pantalla
if (botonSubir && mostrar) {
    botonSubir.addEventListener('click', () => {
        cantidad++;
        mostrar.textContent = cantidad;
    });
}

// Al darle click al botón -, resto 1 pero sin pasar de 0 para que no sea negativo
if (botonBajar && mostrar) {
    botonBajar.addEventListener('click', () => {
        if (cantidad > 0) {
            cantidad--;
            mostrar.textContent = cantidad;
        }
    });
}

// Hago lo mismo para los productos del catálogo (uso querySelector en cada tarjeta para no confundirlos)
document.querySelectorAll('.products-1-1').forEach(card => {
    let cantidad2 = 0; // Cada tarjeta tiene su propio contador independiente

    const botonSubir2 = card.querySelector('.b-mas-2');
    const botonBajar2 = card.querySelector('.b-menos-2');
    const mostrar2 = card.querySelector('.cantidad-2');

    if (botonSubir2 && mostrar2) {
        botonSubir2.addEventListener('click', () => {
            cantidad2++;
            mostrar2.textContent = cantidad2;
        });
    }

    if (botonBajar2 && mostrar2) {
        botonBajar2.addEventListener('click', () => {
            if (cantidad2 > 0) {
                cantidad2--;
                mostrar2.textContent = cantidad2;
            }
        });
    }
});


// ==========================================
// 2. FUNCIÓN PARA SABER SI EL USUARIO ESTÁ LOGUEADO
// ==========================================

// Busco si existe la cookie de sesión "user" en el navegador
function usuarioLogueado() {
    // Separo las cookies por ';' y reviso si alguna empieza con "user="
    return document.cookie.split(';').some(item => item.trim().startsWith('user='));
}


// ==========================================
// 3. PERSISTENCIA DE MI CARRITO DE COMPRAS
// ==========================================

// Traigo el carrito guardado en el navegador (localStorage) para que si se recarga la página no se borre
// Si no hay nada guardado, inicio mi carrito como una lista vacía []
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


// ==========================================
// 4. NOTIFICACIONES FLOTANTES BONITAS (TOASTS)
// ==========================================

// Creo mi propia alerta flotante naranja arriba a la derecha para no usar el alert feo de Windows
function mostrarNotificacion(mensaje, tipo = 'exito') {
    // Busco si ya existe el contenedor de alertas en la pantalla, si no, lo creo
    let contenedor = document.getElementById('notificacion-container');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'notificacion-container';
        // Le pongo estilos inline fijos para posicionarlo arriba a la derecha de forma flotante
        contenedor.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 99999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(contenedor);
    }

    // Creo el cuadrito de la alerta
    const notificacion = document.createElement('div');
    // Color corporativo naranja para éxito y rojo para advertencias
    const colorFondo = tipo === 'exito' ? '#ff6600' : '#d9534f';
    
    // Le doy un diseño bonito con bordes redondeados y sombra
    notificacion.style.cssText = `
        background-color: ${colorFondo};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-family: 'Roboto Condensed', sans-serif;
        font-size: 15px;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 250px;
        transform: translateX(120%); /* Inicia fuera de la pantalla a la derecha */
        transition: transform 0.3s ease-in-out; /* Transición suave para el deslizamiento */
    `;

    // Emoji diferente según el tipo de mensaje
    const icono = tipo === 'exito' ? '🛒' : '⚠️';
    notificacion.innerHTML = `<span>${icono}</span> <span>${mensaje}</span>`;

    // Meto mi alerta en el contenedor flotante
    contenedor.appendChild(notificacion);

    // Hago que entre deslizándose hacia adentro al instante
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
    }, 10);

    // A los 3 segundos la deslizo hacia afuera y luego la borro por completo del HTML
    setTimeout(() => {
        notificacion.style.transform = 'translateX(120%)';
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 3000);
}


// ==========================================
// 5. EVENTO PARA AÑADIR PRODUCTOS AL CARRITO
// ==========================================

// En la página de inicio (Landing Page):
document.querySelectorAll('.products-1').forEach(card => {
    const btnCarrito = card.querySelector('.enviar-carrito');
    if (btnCarrito) {
        btnCarrito.addEventListener('click', () => {
            // Verifico si el usuario inició sesión, si no, le muestro mi alerta roja y no le dejo agregar
            if (!usuarioLogueado()) {
                mostrarNotificacion('Debes iniciar sesión para añadir productos al carrito', 'error');
                return;
            }

            // Saco el nombre, el precio y la cantidad de la tarjeta de producto
            const nombre = card.querySelector('.Categoría-1')?.textContent;
            const precio = card.querySelector('.precio-number')?.textContent;
            const cantidadSeleccionada = parseInt(card.querySelector('#cantidad')?.textContent || '0');

            if (cantidadSeleccionada > 0) {
                // Meto el producto a mi lista de carrito
                carrito.push({ nombre, precio, cantidad: cantidadSeleccionada });
                // Guardo la lista en el localStorage de mi navegador
                localStorage.setItem('carrito', JSON.stringify(carrito));
                
                mostrarNotificacion(`${nombre} x${cantidadSeleccionada} añadido al carrito`, 'exito');
            } else {
                mostrarNotificacion('Selecciona una cantidad primero', 'error');
            }
        });
    }
});

// En la página del catálogo:
document.querySelectorAll('.products-1-1').forEach(card => {
    const btnCarrito2 = card.querySelector('.enviar-carrito-2');
    if (btnCarrito2) {
        btnCarrito2.addEventListener('click', () => {
            // Verifico sesión del lado del cliente
            if (!usuarioLogueado()) {
                mostrarNotificacion('Debes iniciar sesión para añadir productos al carrito', 'error');
                return;
            }

            const nombre = card.querySelector('.Categoría')?.textContent;
            const precio = card.querySelector('.precio-number')?.textContent;
            const cantidadSeleccionada2 = parseInt(card.querySelector('.cantidad-2')?.textContent || '0');

            if (cantidadSeleccionada2 > 0) {
                carrito.push({ nombre, precio, cantidad: cantidadSeleccionada2 });
                localStorage.setItem('carrito', JSON.stringify(carrito));
                mostrarNotificacion(`${nombre} x${cantidadSeleccionada2} añadido al carrito`, 'exito');
            } else {
                mostrarNotificacion('Selecciona una cantidad primero', 'error');
            }
        });
    }
});


// ==========================================
// 6. PANEL FLOTANTE DEL CARRITO DE COMPRAS (SIDEBAR)
// ==========================================

// Evento al dar click en el icono del carrito arriba en la barra de navegación
const iconoCarrito = document.querySelector('.shop');
if (iconoCarrito) {
    iconoCarrito.addEventListener('click', () => mostrarCarrito());
}

// Función que crea y dibuja el panel de compras al lado derecho
function mostrarCarrito() {
    let modal = document.getElementById('modal-carrito');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-carrito';
        // Estilos fijos para que ocupe todo el alto a la derecha cubriendo la pantalla
        modal.style.cssText = `
            position: fixed; 
            top: 0; 
            right: 0; 
            width: 350px; 
            height: 100vh;
            background: #1a1a1a; 
            z-index: 9999; 
            padding: 20px;
            box-shadow: -5px 0 15px rgba(0,0,0,0.5); 
            overflow-y: auto;
        `;
        document.body.appendChild(modal);
    }

    // Cabecera del panel del carrito con botón de cierre
    let html = `
        <button onclick="document.getElementById('modal-carrito').remove()" 
        style="float:right;background:none;border:none;color:white;font-size:20px;cursor:pointer">✕</button>
        <h2 style="color:#ff6600">🛒 Carrito</h2>
        <hr style="border-color:#333">`;

    // Si no tiene productos, muestro un mensaje
    if (carrito.length === 0) {
        html += `<p style="color:gray">El carrito está vacío</p>`;
    } else {
        // Recorro todos los productos del carrito y los pongo en la lista
        carrito.forEach((item, i) => {
            html += `
            <div style="color:white;margin:10px 0;border-bottom:1px solid #333;padding-bottom:10px">
                <b>${item.nombre}</b><br>
                Cantidad: ${item.cantidad}<br>
                Precio: ${item.precio}
                <!-- Botón que borra el producto llamando a eliminarItem pasándole su índice -->
                <button onclick="eliminarItem(${i})" 
                style="background:#ff6600;border:none;color:white;padding:3px 8px;border-radius:5px;cursor:pointer;float:right">
                Eliminar</button>
            </div>`;
        });
    }

    // CALCULO EL TOTAL GENERAL: Recorro los productos y les quito caracteres raros al precio para sumarlos (ej: de 'RD$350' a '350')
    let total = carrito.reduce((acc, item) => {
        let precio = parseInt(item.precio.replace(/[^0-9]/g, ''));
        return acc + (precio * item.cantidad);
    }, 0);

    // Pie de la tarjeta del carrito con total y botón para finalizar compra
    html += `
        <hr style="border-color:#333">
        <p style="color:white;font-size:18px">Total: <b style="color:#ff6600">RD$${total}</b></p>
        <button onclick="finalizarCompra()" 
        style="width:100%;padding:12px;background:#ff6600;border:none;color:white;
        border-radius:8px;font-size:16px;cursor:pointer;margin-top:10px">
        Finalizar compra</button>
    `;
    modal.innerHTML = html;
}

// Función para eliminar un producto del carrito
function eliminarItem(index) {
    carrito.splice(index, 1); // Quito el producto de la lista
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardo el cambio en localStorage
    mostrarCarrito(); // Vuelvo a dibujar el carrito
}

// Función para ir a finalizar la compra
function finalizarCompra() {
    // Si no ha iniciado sesión, no le dejo ir a pagar y lo mando a loguearse
    if (!usuarioLogueado()) {
        alert('Debes iniciar sesión para poder finalizar tu compra.');
        window.location.href = '/login';
        return;
    }

    // Si el carrito está vacío no avanzo
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    // Lo mando a mi página de checkout.hbs
    window.location.href = '/checkout';
}