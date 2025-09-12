window.addEventListener("beforeunload", () => {
  localStorage.removeItem("productos");
});




// Obtener productos guardados o usar productos por defecto
let productos = JSON.parse(localStorage.getItem("productos")) || [
  {
    id: 1,
    nombre: "Uñas Press On",
    descripcion: "Uñas Press On",
    imagen: "https://i.pinimg.com/1200x/4e/7f/c8/4e7fc89f546e21ef6231f13b5f491f6e.jpg",
    precio: "20.00"
  },
  {
    id: 2,
    nombre: "Uñas Press On",
    descripcion: "Uñas Press On",
    imagen: "https://i.pinimg.com/1200x/58/2c/fe/582cfef6ba64da56775eced8189ba2e1.jpg",
    precio: "20.00"
  },
  {
    id: 3,
    nombre: "Uñas Press On",
    descripcion: "Uñas Press On",
    imagen: "https://img.kwcdn.com/product/fancy/407abcef-b7ff-4ddb-b981-506c00ee6716.jpg?imageView2/2/w/800/q/70",
    precio: "20.00"
  },
  {
    id: 4,
    nombre: "Uñas Press On",
    descripcion: "Uñas Press On",
    imagen: "https://i.pinimg.com/736x/21/9e/a9/219ea9589d25eed07e6fde99bf0ad195.jpg",
    precio: "20.00"
  },
  {
    id: 5,
    nombre: "Uñas Press On",
    descripcion: "Uñas Press On",
    imagen: "https://i.pinimg.com/1200x/7c/8e/3a/7c8e3a6eebfe6588cd22feba82d86d43.jpg",
    precio: "20.00"
  },
  {
    id: 6,
    nombre: "Uñas Press On",
    descripcion: "Uñas Press On",
    imagen: "https://i.pinimg.com/736x/30/36/fa/3036fa653b5f90655bae071a6915d5f1.jpg",
    precio: "20.00"
  },
  {
    id: 7,
    nombre: "Uñas Press On",
    descripcion: "Uñas Press On",
    imagen: "https://i.pinimg.com/736x/f2/98/3d/f2983d13d546f7d24384c18ca4325263.jpg",
    precio: "20.00"
  },
  {
    id: 8,
    nombre: "Uñas Press On",
    descripcion: "Uñas Press On",
    imagen: "https://i.pinimg.com/736x/c8/ef/6b/c8ef6b56c2d9ab93e54bd6bff9328a4e.jpg",
    precio: "20.00"
  }
];

// Función para guardar el array actualizado en localStorage
function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

// Función para renderizar la tabla de administración
function renderizarTabla() {
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";

  productos.forEach((producto, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${producto.imagen}" width="60" class="rounded"></td>
      <td>${producto.nombre}</td>
      <td>${producto.descripcion}</td>
      <td>$${producto.precio}</td>
      <td>
        <button class="btn btn-sm btn-primary btnEditar" data-index="${index}">Editar</button>
        <button class="btn btn-sm btn-danger btnEliminar" data-index="${index}">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  activarBotones();
}

// Activa los botones editar y eliminar
function activarBotones() {
  // EDITAR
  document.querySelectorAll(".btnEditar").forEach(btn => {
    btn.addEventListener("click", function () {
      const index = this.dataset.index;
      const producto = productos[index];

      // Llenar modal con valores actuales
      document.getElementById("editNombre").value = producto.nombre;
      document.getElementById("editDescripcion").value = producto.descripcion;
      document.getElementById("editPrecio").value = producto.precio;
      document.getElementById("editImagen").value = producto.imagen;

      // Guardar índice para saber qué producto editar
      document.getElementById("formEditar").dataset.index = index;

      // Mostrar modal de edición
      const modal = new bootstrap.Modal(document.getElementById("modalEditar"));
      modal.show();
    });
  });

  // ELIMINAR
  document.querySelectorAll(".btnEliminar").forEach(btn => {
    btn.addEventListener("click", function () {
      const index = this.dataset.index;
      document.getElementById("nombreEliminar").textContent = productos[index].nombre;
      document.getElementById("confirmarEliminar").dataset.index = index;

      const modal = new bootstrap.Modal(document.getElementById("modalEliminar"));
      modal.show();
    });
  });
}

// Evento submit del formulario de edición
document.getElementById("formEditar").addEventListener("submit", function (e) {
  e.preventDefault();
  const index = this.dataset.index;

  // Actualizar datos
  productos[index].nombre = document.getElementById("editNombre").value;
  productos[index].descripcion = document.getElementById("editDescripcion").value;
  productos[index].precio = document.getElementById("editPrecio").value;
  productos[index].imagen = document.getElementById("editImagen").value;

  // Guardar cambios
  guardarProductos();

  // Re-renderizar tabla para ver los cambios
  renderizarTabla();

  // Cerrar modal
  bootstrap.Modal.getInstance(document.getElementById("modalEditar")).hide();
});

// Confirmar eliminación
document.getElementById("confirmarEliminar").addEventListener("click", function () {
  const index = this.dataset.index;
  productos.splice(index, 1);

  // Guardar cambios
  guardarProductos();

  // Re-renderizar tabla
  renderizarTabla();

  // Cerrar modal
  bootstrap.Modal.getInstance(document.getElementById("modalEliminar")).hide();
});

// Opción para reiniciar catálogo si es necesario
function resetCatalogo() {
  localStorage.removeItem("productos");
  location.reload();
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  renderizarTabla();
});