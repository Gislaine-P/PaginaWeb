
const perf = document.getElementById("Perfil");

if (perf) {
  const usernombre = document.getElementById("nombre");
  const correoSpan = document.getElementById("correo");
  const direccionSpan = document.getElementById("direccion");
  const logout = document.getElementById("logout");

  // Modal Bootstrap
  const modalEditar = new bootstrap.Modal(document.getElementById("modalEditarPerfil"));
  const inputEditarPerfil = document.getElementById("inputEditarPerfil");
  const formEditarPerfil = document.getElementById("formEditarPerfil");

  let campoActual = null;

  // Obtener usuario del localStorage
  const data = JSON.parse(localStorage.getItem("usuario"));

  if (data && data.Usuario) {
    usernombre.textContent = data.Usuario;
    if (data.Correo) correoSpan.textContent = data.Correo;
    if (data.Direccion) direccionSpan.textContent = data.Direccion;
  } else {
    window.location.href = "Login.html";
  }

  // Editar correo
  document.getElementById("editarCorreoBtn").addEventListener("click", () => {
    campoActual = "Correo";
    inputEditarPerfil.value = correoSpan.textContent;
    modalEditar.show();
  });

  // Editar dirección
  document.getElementById("editarDireccionBtn").addEventListener("click", () => {
    campoActual = "Direccion";
    inputEditarPerfil.value = direccionSpan.textContent;
    modalEditar.show();
  });

  // Guardar cambios desde el modal
  formEditarPerfil.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevoValor = inputEditarPerfil.value.trim();
    if (!nuevoValor) return;

    if (campoActual === "Correo") {
      correoSpan.textContent = nuevoValor;
      data.Correo = nuevoValor;
    } else if (campoActual === "Direccion") {
      direccionSpan.textContent = nuevoValor;
      data.Direccion = nuevoValor;
    }

    // Guardar en localStorage
    localStorage.setItem("usuario", JSON.stringify(data));

    modalEditar.hide();
  });

  // Logout
  logout.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("usuario");
    window.location.href = "Login.html";
  });
}
