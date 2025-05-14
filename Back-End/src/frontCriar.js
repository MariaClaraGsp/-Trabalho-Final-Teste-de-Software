document.getElementById("form-conta").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const nome = formData.get("nome");
  const email = formData.get("email");
  const senha = formData.get("senha");

  try {
    const resposta = await fetch("http://localhost:3000/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, senha })
    });

    if (resposta.ok) {
      alert("Conta criada com sucesso!");
      this.reset();
    } else {
      const erro = await resposta.json();
      alert("Erro: " + erro.mensagem);
    }
  } catch (erro) {
    console.error("Erro ao conectar com o servidor:", erro);
    alert("Erro ao conectar com o servidor.");
  }
});
