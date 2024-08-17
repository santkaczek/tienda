let productos = [];
let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
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
    console.log('Contenido del contenedor de productos:', contenedorProductos.innerHTML);
    actualizarBotonesAgregar();
}


function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll(".producto-agregar");
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

    // alerta con SweetAlert2
    Swal.fire({
        title: '¡Producto agregado!',
        text: `${productoAgregado.titulo} ha sido agregado al carrito.`,
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

function actualizarNumerito() {
    if (numerito) {
        let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numerito.innerText = nuevoNumerito;
    } else {
        console.error('Elemento con ID "numerito" no encontrado');
    }
}

function configurarBotonesCategorias(productos) {
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
}

fetch('./js/productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data;
        console.log('Productos cargados:', productos); 
        cargarProductos(productos);
        configurarBotonesCategorias(productos);
    })
    .catch(error => console.error('Error al cargar los productos:', error));

    const botonShop = document.querySelector("#Shop");
    if (botonShop) {
        botonShop.addEventListener("click", () => {
            console.log('Botón Shop clickeado'); 
            console.log('Estado de productos:', productos); 
    
            if (productos.length > 0) {
                cargarProductos(productos); 
            } else {
                console.error('No hay productos disponibles para mostrar.');
            }
        });
    }
    



