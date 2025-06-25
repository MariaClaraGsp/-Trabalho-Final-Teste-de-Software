async function fazerLogin(email, senha) {
  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, senha })
  });

  const data = await response.json();
  return { status: response.ok, data };
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const mensagemEl = document.getElementById("mensagem");
    mensagemEl.textContent = "";

    try {
      const { status, data } = await fazerLogin(email, senha);

      if (status && data.sucesso) {
      
        if (data.usuario && data.usuario.id) {
          localStorage.setItem('id', data.usuario.id); // Salva o ID do usuário no localStorage
        } else {
          console.warn("ID do usuário não encontrado na resposta de login.");
          // Você pode adicionar um alerta ao usuário aqui se o ID for crítico para o fluxo
        }
  

        alert("Login bem-sucedido! Bem-vindo, " + data.usuario.nome);
        window.location.href = "/principal.html";
      } else {
        mensagemEl.textContent = data.mensagem || "E-mail ou senha incorretos.";
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      mensagemEl.textContent = "Erro de conexão com o servidor.";
    }
  });
});