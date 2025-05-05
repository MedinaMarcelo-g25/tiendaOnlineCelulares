document.addEventListener("DOMContentLoaded", () => {
    const elementosCarrito = document.getElementById("itemsCarrito");
    const elementoPrecioTotal = document.getElementById("precioTotal");
    const botonLimpiarCarrito = document.getElementById("limpiarCarrito");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function actualizarCarrito() {
        if (!elementosCarrito || !elementoPrecioTotal) return;

        elementosCarrito.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, indice) => {
            const item = document.createElement("div");
            item.classList.add("item-carrito");

            item.innerHTML = `
                <img src="${producto.imagenUrl}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <button onclick="eliminarDelCarrito(${indice})">Eliminar</button>
            `;

            elementosCarrito.appendChild(item);
            total += producto.precio;
        });

        elementoPrecioTotal.textContent = `Total: $${total.toFixed(2)}`;
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    window.eliminarDelCarrito = function (indice) {
        carrito.splice(indice, 1);
        guardarCarrito();
        actualizarCarrito();
    };

    if (botonLimpiarCarrito) {
        botonLimpiarCarrito.addEventListener("click", () => {
            carrito = [];
            guardarCarrito();
            actualizarCarrito();

            Swal.fire({
                icon: 'success',
                title: 'Carrito vacío',
                text: 'El carrito se ha vaciado correctamente.',
                confirmButtonText: 'Aceptar'
            });
        });
    }

    document.getElementById("finalizarCompra").addEventListener("click", () => {
        if (carrito.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Carrito vacío',
                text: 'Agrega productos antes de finalizar la compra.',
            });
            return;
        }

        carrito = [];
        guardarCarrito();
        actualizarCarrito();

        Swal.fire({
            icon: 'success',
            title: '¡Compra realizada con éxito!',
            text: 'Gracias por tu pedido.',
            confirmButtonText: 'Aceptar'
        });
    });

    document.getElementById("formDatosCliente").addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombreCliente").value;
        const email = document.getElementById("emailCliente").value;
        const direccion = document.getElementById("direccionCliente").value;

        const datosCliente = { nombre, email, direccion };
        localStorage.setItem("datosCliente", JSON.stringify(datosCliente));

        Swal.fire({
            icon: 'success',
            title: 'Datos guardados',
            text: 'Los datos del cliente se guardaron correctamente.',
            confirmButtonText: 'Aceptar'
        });
    });

    actualizarCarrito();
});