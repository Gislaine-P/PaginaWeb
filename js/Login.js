const login = document.getElementById("Login");
if (login) {
  login.addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const contraseña = document.getElementById("contra").value.trim();

    if (nombre && contraseña) {
      if (nombre === "Administrador" && contraseña === "Administrador123") {
        window.location.href = "Dashboard.html";
      } else {
        localStorage.setItem(
          "usuario",
          JSON.stringify({ Usuario: nombre })
        );
        window.location.href = "Perfil.html";
      }
    } else {
      alert("Ingresa nombre y contraseña");
      document.getElementById("nombre").focus();
    }
  });
}