document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".formulario-login");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const codigo = document.querySelector('input[type="text"]').value;
    const senha = document.querySelector('input[type="password"]').value;

    if (codigo === "admin" && senha === "1234") {
      window.location.href = "produtosCadastrados.html";  // <-- Caminho relativo correto
    } else {
      alert("Código ou senha incorretos!");
    }
  });
});
