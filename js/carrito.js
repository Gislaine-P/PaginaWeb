window.onload = function() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("carrito-container");
    const totalElem = document.getElementById("total");

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
        totalElem.textContent = "Total: $0";
        return;
    }

    let total = 0;

    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        if (!producto) return;

        // Convertir precio string a número, porque en tu array está como string "20.00"
        const precioNum = parseFloat(producto.precio);
        const subtotal = precioNum * item.cantidad;
        total += subtotal;

        const div = document.createElement("div");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="100" />
            <h4>${producto.nombre}</h4>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Precio unitario: $${precioNum.toFixed(2)}</p>
            <p>Subtotal: $${subtotal.toFixed(2)}</p>
            <hr>
        `;
        contenedor.appendChild(div);
    });

    totalElem.textContent = `Total: $${total.toFixed(2)}`;

    document.querySelector("button").addEventListener("click", () => {
        localStorage.removeItem("carrito");
        alert("¡Gracias por tu compra!");
        window.location.reload();
    });
};

