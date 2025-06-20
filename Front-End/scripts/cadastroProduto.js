document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".form-produto").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nome = document.querySelector('input[name="nome"]').value.trim();
    const valor = document.querySelector('input[name="valor"]').value.trim();
    const descricao = document.querySelector('input[name="descricao"]').value.trim();
    const categoria = document.querySelector('select[name="categoria"]').value;
    const estoque = document.querySelector('input[name="estoque"]').value.trim();
    const senha = document.querySelector('input[name="senha"]').value.trim();

    if (senha !== "1234") {
      alert("Senha incorreta.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          valor: parseFloat(valor),
          descricao,
          categoria,
          estoque: parseInt(estoque),
          senha
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Produto cadastrado com sucesso!");
        e.target.reset();
      } else {
        alert(data.mensagem || "Erro ao cadastrar o produto.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      alert("Erro de conexão com o servidor.");
    }
  });
});
