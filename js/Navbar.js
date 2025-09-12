document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const cuentaDiv = document.querySelector(".offcanvas-body .border-top");

  if (usuario && cuentaDiv) {
    cuentaDiv.innerHTML = `
      <p class="text-muted mb-1"><strong>Mi cuenta</strong></p>
      <a href="Perfil.html" class="nav-link">Perfil</a>
      <a href="#" id="logout" class="nav-link">Cerrar sesión</a>
    `;

    document.getElementById("logout").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuario");
      window.location.reload();
    });
  }
});
