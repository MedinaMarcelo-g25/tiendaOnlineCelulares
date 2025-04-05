const productos = [    
        {  
            id: 1,  
            nombre: "Samsung Galaxy S21",  
            precio: 799.99,  
            category: "Celulares",  
            imagenUrl: "https://m.media-amazon.com/images/I/71H-UR2FX5L._AC_SL1500_.jpg"  
        },  
        {  
            id: 2,  
            nombre: "Apple iPhone 13",  
            precio: 799.00,  
            category: "Celulares",  
            imagenUrl: "https://m.media-amazon.com/images/I/71mOTzampWL._AC_SL1500_.jpg"  
        },  
        {  
            id: 3,  
            nombre: "Google Pixel 6",  
            precio: 599.99,  
            category: "Celulares",  
            imagenUrl: "https://m.media-amazon.com/images/I/71W0msnhYUL._SX679_.jpg"  
        },  
        {  
            id: 4,  
            nombre: "OnePlus 9",  
            precio: 729.99,  
            category: "Celulares",  
            imagenUrl: "https://m.media-amazon.com/images/I/71Fhu65LPL._AC_SL1500_.jpg"  
        },  
        {  
            id: 5,  
            nombre: "Xiaomi Mi 11",  
            precio: 749.99,  
            category: "Celulares",  
            imagenUrl: "https://m.media-amazon.com/images/I/71tcNQ-GwlL._AC_SL1500_.jpg"  
        },  
        {  
            id: 6,  
            nombre: "Sony Xperia 1 III",  
            precio: 1299.99,  
            category: "Celulares",  
            imagenUrl: "https://m.media-amazon.com/images/I/71-JtxkK3-L._AC_SL1500_.jpg"  
        },  
        {  
            id: 7,  
            nombre: "Nokia G50",  
            precio: 339.99,  
            category: "Celulares",  
            imagenUrl: "https://m.media-amazon.com/images/I/61inoQUF1-L._AC_SL1000_.jpg"  
        },  
        {  
            id: 8,  
            nombre: "Huawei P40 Pro",  
            precio: 999.99,  
            category: "Celulares",  
            imagenUrl: "https://m.media-amazon.com/images/I/71eyc18JOFL._AC_SL1500_.jpg"  
        },  
        {  
            id: 9,  
            nombre: "Motorola Moto G Power (2021)",  
            precio: 249.99,  
            category: "Celulares",  
            imagenUrl: "https://m.media-amazon.com/images/I/81LvcznfLAL._AC_SL1500_.jpg"  
        },  
        {  
            id: 10,  
            nombre: "LG Velvet",  
            precio: 599.99,  
            category: "Celulares",  
            imagenUrl: "https://m.media-amazon.com/images/I/81Edbt+KrrL._AC_SL1500_.jpg"  
        },  
        {  
            id: 11,  
            nombre: "Samsung Galaxy A52",  
            precio: 349.99,  
            category: "Celulares",  
            imagenUrl: "https://m.media-amazon.com/images/I/71N1wXMNJtL._AC_SL1500_.jpg"  
        },  
        {  
            id: 12,  
            nombre: "Apple iPhone SE (2020)",  
            precio: 399.99,  
            category: "Celulares",  
            imagenUrl: "https://m.media-amazon.com/images/I/71WoCo4DW1L._AC_SL1500_.jpg"  
        },  
        {  
            id: 13,  
            nombre: "Google Pixel 5",  
            precio: 699.99,  
            category: "Celulares",  
            imagenUrl: "https://m.media-amazon.com/images/I/61Mzq9sDgWL._AC_SL1000_.jpg"  
        },  
        {  
            id: 14,  
            nombre: "Oppo Find X3 Pro",  
            precio: 1149.99,  
            category: "Celulares",  
            imagenUrl: "https://m.media-amazon.com/images/I/517HNWcu7lL._AC_.jpg"  
        },  
];

document.addEventListener("DOMContentLoaded", () => {
    const listaProductos = document.getElementById("listaProductos");

    function mostrarProductos() {
        if (!listaProductos) return;

        listaProductos.innerHTML = ""; // Limpiar el listado de productos

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

    // Función para mostrar el mensaje de confirmación
    function mostrarMensajeCarrito(mensaje) {
        const mensajeCarrito = document.getElementById("mensajeCarrito");
        if (!mensajeCarrito) return;

        mensajeCarrito.textContent = mensaje; 
        mensajeCarrito.classList.remove("oculto");
        mensajeCarrito.classList.add("mostrar");

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            mensajeCarrito.classList.remove("mostrar");
            mensajeCarrito.classList.add("oculto");
        }, 3000);
    }

    window.agregarAlCarrito = function (productoId) {
        const producto = productos.find(p => p.id === productoId);
        if (producto) {
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            carrito.push(producto);
            localStorage.setItem("carrito", JSON.stringify(carrito));

            // Llama a la función para mostrar el mensaje
            mostrarMensajeCarrito(`${producto.nombre} agregado al carrito!`);
        }
    };

    window.filtarProductos = function () {
        const filtrarInput = document.getElementById("filtrarInput").value.toLowerCase();
        const productosFiltrados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(filtrarInput)
        );
        mostrarProductosFiltrados(productosFiltrados);
    };

    function mostrarProductosFiltrados(productosFiltrados) {
        listaProductos.innerHTML = ""; // Reiniciar la lista de productos

        if (productosFiltrados.length > 0) {
            productosFiltrados.forEach(producto => {
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
        } else {
            listaProductos.innerHTML = "<p>No hay productos que coincidan con tu búsqueda.</p>";
        }
    }

    // Mostrar los productos al cargar la página
    mostrarProductos();
});

