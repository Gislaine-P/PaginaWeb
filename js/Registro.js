document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("Registro");

  if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
      e.preventDefault();


      const nombre = document.getElementById("name").value.trim();
      const apellido = document.getElementById("apellido").value.trim();
      const username = document.getElementById("user").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const psw = document.getElementById("psw").value.trim();
      const repeatPsw = document.getElementById("repeat-psw").value.trim();
      const direccion = document.getElementById("Direc").value.trim();


      if (!nombre || !apellido || !username || !correo || !psw || !repeatPsw || !direccion) {
        alert("⚠️ Debes completar todos los campos.");
        return;
      }
       if (correo === "Administrador123@gmail.com") {
        alert("Correo inválido, ingresa nuevamente");
        document.getElementById("correouser").value = "";
        document.getElementById("correouser").focus();
        return;
      }else{
          if ((correo.match(/@/g) || []).length !== 1) {
          alert("⚠️ El correo debe contener exactamente un '@'.");
          return;
        }
      }
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

      if (psw !== repeatPsw) {
        alert("⚠️ Las contraseñas no coinciden.");
        return;
      }


      const nuevoUsuario = {
        nombre,
        apellido,
        username,
        correo,
        psw, // importante para login después
        direccion
      };

      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));

      alert("✅ Usuario registrado correctamente");

      window.location.href = "Perfil.html";
    });
  }
});
