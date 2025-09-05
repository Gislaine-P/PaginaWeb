window.addEventListener("DOMContentLoaded", function () {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("carrito-container");
    const totalElem = document.getElementById("total");

    contenedor.innerHTML = "";  // Limpiar el contenedor antes de agregar productos

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
        totalElem.textContent = "Total: $0";
        return;
    }

    let total = 0;

    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        if (!producto) return;

        // Convertir precio string a número
        const precioNum = parseFloat(producto.precio);
        const subtotal = precioNum * item.cantidad;
        total += subtotal;

        // Crear una barra horizontal para el producto
        const div = document.createElement("div");
        div.classList.add("d-flex", "justify-content-between", "align-items-center", "border-bottom", "py-3");
        div.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid" style="width: 60px; height: auto; margin-right: 10px;">
                <div>
                    <h5 class="mb-1">${producto.nombre}</h5>
                    <p class="mb-0">Cantidad: ${item.cantidad}</p>
                    <p class="mb-0">Precio unitario: $${precioNum.toFixed(2)}</p>
                </div>
            </div>
            <p class="mb-0">Subtotal: $${subtotal.toFixed(2)}</p>
        `;
        contenedor.appendChild(div);
    });

    totalElem.textContent = `Total: $${total.toFixed(2)}`;

    // Botón de compra
    const botonComprar = document.getElementById("btn-comprar");

    if (botonComprar) {
        botonComprar.addEventListener("click", function () {
            // Limpiar el carrito en localStorage
            localStorage.removeItem("carrito");

            // Mostrar mensaje de compra
            alert("¡Gracias por tu compra!");

            // Recargar la página
            window.location.reload();
        });
    } else {
        console.log("El botón no fue encontrado.");
    }
});
