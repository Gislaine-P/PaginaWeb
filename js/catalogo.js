const productos = [

    {   id: 1,
        nombre: "Uñas Press On",
        descripcion: "Uñas Press On",
        imagen: "https://i.pinimg.com/1200x/4e/7f/c8/4e7fc89f546e21ef6231f13b5f491f6e.jpg",
        precio: "20.00"

    },
    {   id: 2,
        nombre: "Uñas Press On",
        descripcion: "Uñas Press On",
        imagen: "https://i.pinimg.com/1200x/58/2c/fe/582cfef6ba64da56775eced8189ba2e1.jpg",
        precio: "20.00"

    },
    {   id: 3,
        nombre: "Uñas Press On",
        descripcion: "Uñas Press On",
        imagen: "https://img.kwcdn.com/product/fancy/407abcef-b7ff-4ddb-b981-506c00ee6716.jpg?imageView2/2/w/800/q/70",
        precio: "20.00"

    },
    {   id: 4,
        nombre: "Uñas Press On",
        descripcion: "Uñas Press On",
        imagen: "https://i.pinimg.com/736x/21/9e/a9/219ea9589d25eed07e6fde99bf0ad195.jpg",
        precio: "20.00"

    },
    {   id: 5,
        nombre: "Uñas Press On",
        descripcion: "Uñas Press On",
        imagen: "https://i.pinimg.com/1200x/7c/8e/3a/7c8e3a6eebfe6588cd22feba82d86d43.jpg",
        precio: "20.00"

    },
    {   id: 6,
        nombre: "Uñas Press On",
        descripcion: "Uñas Press On",
        imagen: "https://i.pinimg.com/736x/30/36/fa/3036fa653b5f90655bae071a6915d5f1.jpg",
        precio: "20.00"

    },
    {   id: 7,
        nombre: "Uñas Press On",
        descripcion: "Uñas Press On",
        imagen: "https://i.pinimg.com/736x/f2/98/3d/f2983d13d546f7d24384c18ca4325263.jpg",
        precio: "20.00"

    },
    {   id: 8,
        nombre: "Uñas Press On",
        descripcion: "Uñas Press On",
        imagen: "https://i.pinimg.com/736x/c8/ef/6b/c8ef6b56c2d9ab93e54bd6bff9328a4e.jpg",
        precio: "20.00"

    }
];

function verProducto(id){
    const producto = productos.find(p => p.id === id);
    if(producto){
        localStorage.setItem("productoSelect", JSON.stringify(producto));
        window.location.href = "producto.html";
    }else{
        alert("Producto no encontrado");
    }
}


window.onload = function () {
    const contenedor = document.getElementById("productos");

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="150">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button onclick="verProducto(${producto.id})">Ver Producto</button>
            <hr>
        `;
        contenedor.appendChild(div);
    });
};
