document.addEventListener("DOMContentLoaded", () => {
    const listaProductos = document.getElementById("listaProductos");

    fetch("./data/productos.json")
        .then(response => response.json())
        .then(productos => {
            const celulares = productos.filter(producto => producto.categoria === "Celulares");
            const perfumeria = productos.filter(producto => producto.categoria === "Perfumería");
            const electronica = productos.filter(producto => producto.categoria === "Electrónica");

            
            mostrarProductosEnCarrusel(celulares, "carruselCelulares");
            mostrarProductosEnCarrusel(perfumeria, "carruselPerfumeria");
            mostrarProductosEnCarrusel(electronica, "carruselElectronica");

            configurarFiltro(productos); 
        })
        .catch(error => console.error("Error al cargar los productos:", error));

    function mostrarProductos(productos) {
        listaProductos.innerHTML = ""; 

        productos.forEach(producto => {
            const productoCarrito = document.createElement("div");
            productoCarrito.classList.add("producto-carrito");

            productoCarrito.innerHTML = `
                <img src="${producto.imagenUrl}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            `;

            listaProductos.appendChild(productoCarrito);
        });
    }

    function mostrarProductosEnCarrusel(productos, idCarrusel) {
        const carrusel = document.getElementById(idCarrusel);
        carrusel.innerHTML = ""; 

        productos.forEach(producto => {
            const productoElemento = document.createElement("div");
            productoElemento.classList.add("producto-carrito");

            productoElemento.innerHTML = `
                <img src="${producto.imagenUrl}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            `;

            carrusel.appendChild(productoElemento);
        });
    }

    function configurarFiltro(productos) {
        const filtrarInput = document.getElementById("filtrarInput");

        filtrarInput.addEventListener("input", () => {
            const textoFiltro = filtrarInput.value.toLowerCase();
            const productosFiltrados = productos.filter(producto =>
                producto.nombre.toLowerCase().includes(textoFiltro)
            );
            mostrarProductos(productosFiltrados); 
        });
    }

    window.agregarAlCarrito = function (productoId) {
        fetch("./data/productos.json")
            .then(response => response.json())
            .then(productos => {
                const producto = productos.find(p => p.id === productoId);
                if (producto) {
                    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                    carrito.push(producto);
                    localStorage.setItem("carrito", JSON.stringify(carrito));

                    mostrarMensajeCarrito(`${producto.nombre} agregado al carrito!`);
                }
            })
            .catch(error => console.error("Error al agregar al carrito:", error));
    };

    function mostrarMensajeCarrito(mensaje) {
        const mensajeCarrito = document.getElementById("mensajeCarrito");
        if (!mensajeCarrito) return;

        mensajeCarrito.textContent = mensaje;
        mensajeCarrito.classList.remove("oculto");
        mensajeCarrito.classList.add("mostrar");

        setTimeout(() => {
            mensajeCarrito.classList.remove("mostrar");
            mensajeCarrito.classList.add("oculto");
        }, 3000);
    }
});

