// Función para ver el producto seleccionado
function verProducto(id) {
  // Guardar el ID del producto seleccionado en localStorage
  localStorage.setItem("productoSeleccionado", id);
  
  // Redirigir a la página de detalle del producto
  window.location.href = "producto.html";
}

// Carga y renderiza productos
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector(".row.g-4");

  // Obtener los productos desde localStorage
  let productos = JSON.parse(localStorage.getItem("productos")) || [];

  // Si no hay productos, mostrar mensaje
  if (productos.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-muted">No hay productos en el catálogo por el momento.</p>
      </div>
    `;
    return;
  }

  // Limpiar contenedor
  contenedor.innerHTML = "";

  // Renderizar productos
  productos.forEach((producto, index) => {
    const card = document.createElement("div");
    card.className = "col-12 col-sm-6 col-md-4 col-lg-3";
    card.innerHTML = `
      <div class="card h-100 border-0 shadow-sm hover-shadow" onclick="verProducto(${producto.id})" style="cursor: pointer;">
        <img src="${producto.imagen}" class="card-img-top rounded-top" alt="Producto ${index + 1}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text text-muted">${producto.descripcion}</p>
          <p class="fw-bold">$${producto.precio}</p>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
});
