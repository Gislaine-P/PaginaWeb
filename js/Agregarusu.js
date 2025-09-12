document.addEventListener("DOMContentLoaded", () => {
  const formAgregar = document.getElementById("agregarusu");

  if (formAgregar) {
    formAgregar.addEventListener("submit", (e) => {
      e.preventDefault();

      // Capturar valores del formulario
      const nombre = document.getElementById("nameuser").value.trim();
      const apellido = document.getElementById("apellidouser").value.trim();
      const username = document.getElementById("username").value.trim();
      const correo = document.getElementById("correouser").value.trim();
      const psw = document.getElementById("pswuser").value.trim();
      const repeatPsw = document.getElementById("repeat-pswuser").value.trim();
      const direccion = document.getElementById("Direcuser").value.trim();

      // Validaciones básicas
      if (!nombre || !apellido || !username || !correo || !psw || !repeatPsw || !direccion) {
        alert("⚠️ Debes completar todos los campos.");
        return;
      }

      // Validar correo (1 arroba)
      if ((correo.match(/@/g) || []).length !== 1) {
        alert("⚠️ El correo debe contener exactamente un '@'.");
        return;
      }

      // Validar correo no permitido
      if (correo === "Administrador123@gmail.com") {
        alert("⚠️ Correo inválido, ingresa nuevamente.");
        document.getElementById("correouser").value = "";
        document.getElementById("correouser").focus();
        return;
      }

      // Validar contraseña
      const errores = [];
      if (psw.length < 8) {
        errores.push("tener al menos 8 caracteres");
      }
      if (!/[A-Z]/.test(psw)) {
        errores.push("contener al menos una letra mayúscula");
      }
      if (!/[0-9]/.test(psw)) {
        errores.push("contener al menos un número");
      }

      if (errores.length > 0) {
        alert("⚠️ La contraseña debe:\n- " + errores.join("\n- "));
        return;
      }

      // Confirmar coincidencia de contraseñas
      if (psw !== repeatPsw) {
        alert("⚠️ Las contraseñas no coinciden.");
        return;
      }

      // Guardar en localStorage
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      usuarios.push({ nombre, apellido, username, correo, direccion });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("✅ Usuario agregado correctamente");

      // Redirigir al dashboard para que muestre la tabla actualizada
      window.location.href = "Dashboard.html";
    });
  }
});
