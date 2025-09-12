document.addEventListener("DOMContentLoaded", () => {
  const tablaBody = document.querySelector("#tablaUsuarios tbody");
  const buscador = document.getElementById("buscador");

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let usuarioIndex = null;

  // Elementos del modal
  const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));
  const formEditarUsuario = document.getElementById('formEditarUsuario');
  const editUsername = document.getElementById('editUsername');
  const editCorreo = document.getElementById('editCorreo');
  const editDireccion = document.getElementById('editDireccion');

  // Función para mostrar usuarios en la tabla
  function mostrarUsuarios(filtro = "") {
    tablaBody.innerHTML = "";

    if (usuarios.length === 0) {
      tablaBody.innerHTML = `<tr><td colspan="4" class="text-center">No hay usuarios registrados</td></tr>`;
      return;
    }

    usuarios
      .filter(u => u.username.toLowerCase().includes(filtro.toLowerCase()))
      .forEach((usuario, index) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${usuario.username}</td>
          <td>${usuario.correo}</td>
          <td>${usuario.direccion}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" onclick="abrirModal(${index})">✏️ Editar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${index})">🗑️ Eliminar</button>
          </td>
        `;
        tablaBody.appendChild(fila);
      });
  }

  // Inicializar tabla
  mostrarUsuarios();

  // Buscador en tiempo real
  buscador.addEventListener("input", (e) => {
    mostrarUsuarios(e.target.value);
  });

  // Abrir modal para editar
  window.abrirModal = function(index) {
    usuarioIndex = index;
    const usuario = usuarios[index];
    editUsername.value = usuario.username;
    editCorreo.value = usuario.correo;
    editDireccion.value = usuario.direccion;
    modalEditar.show();
  };

  // Guardar cambios desde modal
  formEditarUsuario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (usuarioIndex !== null) {
      usuarios[usuarioIndex].username = editUsername.value;
      usuarios[usuarioIndex].correo = editCorreo.value;
      usuarios[usuarioIndex].direccion = editDireccion.value;

      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      mostrarUsuarios();
      modalEditar.hide();
      usuarioIndex = null;
    }
  });

  // Eliminar usuario
  window.eliminarUsuario = function(index) {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      usuarios.splice(index, 1);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      mostrarUsuarios();
    }
  };

  // Limpiar modal al cerrarlo
  document.getElementById('modalEditar').addEventListener('hidden.bs.modal', () => {
    formEditarUsuario.reset();   // limpia los inputs
    usuarioIndex = null;         // resetea índice
  });
});
