window.addEventListener("DOMContentLoaded", function () {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productos = JSON.parse(localStorage.getItem("productos")) || []; 
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

        const precioNum = parseFloat(producto.precio);
        const subtotal = precioNum * item.cantidad;
        total += subtotal;

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

    const botonComprar = document.getElementById("btn-comprar");

    if (botonComprar) {
        botonComprar.addEventListener("click", function () {
            localStorage.removeItem("carrito");
            alert("¡Gracias por tu compra!");
            window.location.reload();
        });
    } else {
        console.log("El botón no fue encontrado.");
    }
});
