document.getElementById("form-conta").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nome = document.querySelector('input[name="nome"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const cpf = document.querySelector('input[name="cpf"]').value.trim();
  const senha = document.querySelector('input[name="senha"]').value.trim();
  const mensagemEl = document.getElementById("mensagem");

  mensagemEl.textContent = "";

  // Validação dos campos obrigatórios
  if (!nome || !email || !cpf || !senha) {
    mensagemEl.textContent = "Todos os campos são obrigatórios.";
    return;
  }

  // Validação do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mensagemEl.textContent = "Email inválido.";
    return;
  }

  // Validação básica de CPF (somente formato numérico com 11 dígitos)
  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(cpf)) {
    mensagemEl.textContent = "CPF inválido. Deve conter 11 dígitos numéricos.";
    return;
  }

  // Validação de senha forte: maiúscula, número, caractere especial e mínimo 6 caracteres
  const senhaForteRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
  if (!senhaForteRegex.test(senha)) {
    mensagemEl.textContent = "A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, cpf, senha })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Conta criada com sucesso!");
      window.location.href = "/cliente.html";
    } else {
      mensagemEl.textContent = data.mensagem || "Erro ao criar conta.";
    }
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    mensagemEl.textContent = "Erro de conexão com o servidor.";
  }
});
