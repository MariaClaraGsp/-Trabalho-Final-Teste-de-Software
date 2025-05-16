document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const mensagemEl = document.getElementById("mensagem");

  mensagemEl.textContent = "";

  try {
    const response = await fetch("http://192.168.1.10:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok && data.sucesso) {
      alert("Login bem-sucedido! Bem-vindo, " + data.usuario.nome);
      window.location.href = "/Front-End/pages/cliente.html";
    } else {
      mensagemEl.textContent = data.mensagem || "Erro no login.";
    }
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    mensagemEl.textContent = "Erro de conexão com o servidor.";
  }
});
