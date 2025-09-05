let producto = null;
let cantidad = 1;
let cantidadInput = null;

window.onload = function() {
    cantidadInput = document.getElementById("cantidad");

    const data = localStorage.getItem("productoSelect");

    if (data) {
        producto = JSON.parse(data);

        document.getElementById("nombre").textContent = producto.nombre;
        document.getElementById("descripcion").textContent = producto.descripcion;
        document.getElementById("imagen").src = producto.imagen;
        document.getElementById("precio").textContent = producto.precio;

        cantidadInput.value = cantidad;
    } else {
        window.location.href = "catalogo.html";
    }
};

// Aumentar botón
function aumentar() {
    cantidad++;
    cantidadInput.value = cantidad;
}

function disminuir() {
    if (cantidad > 1) {
        cantidad--;
        cantidadInput.value = cantidad;
    }
}

function guardarCantidad() {
    if (!producto) {
        alert("No has seleccionado un producto.");
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existe = carrito.find(p => p.id === producto.id);

    if (existe) {
        existe.cantidad += cantidad; // suma cantidades
    } else {
        carrito.push({ id: producto.id, cantidad: cantidad }); // agrega nuevo producto
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Reiniciar cantidad
    cantidad = 1;
    cantidadInput.value = cantidad;

    alert("Producto agregado al carrito");
}
