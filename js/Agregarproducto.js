const formAgregar = document.getElementById("formAgregar");

formAgregar.addEventListener("submit", function (e) {
e.preventDefault();
const nuevoProducto = {
nombre: document.getElementById("nombreProducto").value,
descripcion: document.getElementById("descripcionProducto").value,
precio: parseFloat(document.getElementById("precioProducto").value).toFixed(2),
imagen: document.getElementById("imagenProducto").value
};

let productos = JSON.parse(localStorage.getItem("productos")) || [];
productos.push(nuevoProducto);
localStorage.setItem("productos", JSON.stringify(productos));

alert("Producto agregado correctamente ✅");
formAgregar.reset();
});