// productos
const productos = [
    // Gorras 
    {
        id: "gorra-blanca",
        titulo: "Gorra Blanca",
        imagen: "./img/gorra blanca.jpg",
        categoria: {
            nombre: "Gorra",
            id: "gorra"
        },
        precio: 20000
    },
    {
        id: "gorra-negra",
        titulo: "Gorra Negra",
        imagen: "./img/gorra negra.jpg",
        categoria: {
            nombre: "Gorra",
            id: "gorra"
        },
        precio: 20000
    },
    {
        id: "gorra-blanca-y-negra",
        titulo: "Gorra Blanca y Negra",
        imagen: "./img/gorra blanca y negra.jpg",
        categoria: {
            nombre: "Gorra",
            id: "gorra"
        },
        precio: 20000
    }
];


let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (!productoAgregado) {
        console.error("Producto no encontrado");
        return;
    }

    // Buscar si el producto ya está en el carrito
    const productoEnCarrito = productosEnCarrito.find(producto => producto.id === idBoton);

    if (productoEnCarrito) {
        
        productoEnCarrito.cantidad++;
    } else {
        
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    
    const numerito = document.getElementById('numerito');

    
    if (numerito) {
        
        let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numerito.innerText = nuevoNumerito;
    } else {
        console.error('Elemento con ID "numerito" no encontrado');
    }
}

//función para cargar los productos al cargar la página
cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id !== "todos") {
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Shop";
            cargarProductos(productos);
        }
    });
});


const botonShop = document.querySelector("#Shop");
if (botonShop) {
    botonShop.addEventListener("click", () => {
        // Esta función puede actualizar el contenido de la página o redirigir
        cargarProductos(productos); // Actualiza los productos
    });
}
