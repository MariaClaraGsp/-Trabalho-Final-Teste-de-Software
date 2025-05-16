document.getElementById("form-conta").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nome = document.querySelector('input[name="nome"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const senha = document.querySelector('input[name="senha"]').value;
  const mensagemEl = document.getElementById("mensagem");

  mensagemEl.textContent = "";

  try {
    const response = await fetch("http://192.168.1.10:3000/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Conta criada com sucesso!");
    window.location.href = "/Front-End/pages/cliente.html";
    } else {
      mensagemEl.textContent = data.mensagem || "Erro ao criar conta.";
    }
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    mensagemEl.textContent = "Erro de conexão com o servidor.";
  }
});
