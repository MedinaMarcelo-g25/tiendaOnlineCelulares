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
            const elementoLista = document.createElement("elementoLista");
            elementoLista.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.addEventListener("click", () => {
                carrito.splice(indice, 1);
                guardarCarrito();
                actualizarCarrito();
            });
            elementoLista.appendChild(botonEliminar);
            elementosCarrito.appendChild(elementoLista);
            total += producto.precio;
        });

        elementoPrecioTotal.textContent = `Total: $${total.toFixed(2)}`;
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    if (botonLimpiarCarrito) {
        botonLimpiarCarrito.addEventListener("click", () => {
            carrito = [];
            guardarCarrito();
            actualizarCarrito();
        });
    }

    // Inicializar el carrito
    actualizarCarrito();
});