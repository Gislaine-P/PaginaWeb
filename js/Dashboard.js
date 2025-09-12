document.addEventListener("DOMContentLoaded", () => {
  // Botón cerrar sesión
  const logout = document.getElementById("cerrardash");
  if (logout) {
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuario");
      window.location.href = "Login.html";
    });
  }

  // Redirecciones de menú
  const agregarUsuario = document.querySelector(".dropdown-item.agregarus");
  if (agregarUsuario) {
    agregarUsuario.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "Agregarusu.html";
    });
  }

  const editarUsuario = document.querySelector(".dropdown-item.editarus");
  if (editarUsuario) {
    editarUsuario.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "Editarusuario.html";
    });
  }

  const eliminarUsuario = document.querySelector(".dropdown-item.eliminarus");
  if (eliminarUsuario) {
    eliminarUsuario.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "Eliminarusu.html";
    });
  }

  // Tabla de últimos usuarios
  function cargarUsuarios() {
    const tablaUsuarios = document.getElementById("tabla-usuarios");
    if (!tablaUsuarios) return;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Eliminar duplicados (por username)
    let usuariosUnicos = [];
    let vistos = new Set();
    usuarios.forEach(user => {
      if (!vistos.has(user.username)) {
        usuariosUnicos.push(user);
        vistos.add(user.username);
      }
    });

    // Guardar lista sin duplicados
    localStorage.setItem("usuarios", JSON.stringify(usuariosUnicos));

    // Tomar últimos 5 (los más recientes primero)
    let ultimosUsuarios = usuariosUnicos.slice(-5).reverse();

    tablaUsuarios.innerHTML = "";

    if (ultimosUsuarios.length === 0) {
      tablaUsuarios.innerHTML = `
        <tr>
          <td colspan="2" class="text-muted text-center">
            No hay usuarios registrados aún
          </td>
        </tr>`;
    } else {
      ultimosUsuarios.forEach(user => {
        let fila = `
          <tr>
            <td>${user.username}</td>
            <td>${user.correo}</td>
          </tr>`;
        tablaUsuarios.innerHTML += fila;
      });
    }
  }

  // Cargar al iniciar
  cargarUsuarios();
});
