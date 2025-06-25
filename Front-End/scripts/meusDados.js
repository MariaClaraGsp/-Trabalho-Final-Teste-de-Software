const form = document.getElementById('formMeusDados');
const editarBtn = document.getElementById('editarBtn');
const deletarBtn = document.getElementById('deletarBtn');
const salvarBtn = document.getElementById('salvarBtn');

const idCliente = localStorage.getItem('id');

async function carregarDados() {
  try {
    const response = await fetch(`http://localhost:3000/api/clientes/${idCliente}`);
    const data = await response.json();
    document.getElementById('nome').value = data.nome;
    document.getElementById('cpf').value = data.cpf;
    document.getElementById('email').value = data.email;
  } catch (error) {
    alert('Erro ao carregar os dados.');
    console.error(error);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    nome: document.getElementById('nome').value,
    cpf: document.getElementById('cpf').value,
    email: document.getElementById('email').value,
  };

  try {
    const res = await fetch(`http://localhost:3000/api/clientes/${idCliente}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert('Dados atualizados com sucesso!');
      location.reload();
    } else {
      alert('Erro ao atualizar.');
    }
  } catch (error) {
    alert('Erro de conexão ao atualizar.');
    console.error(error);
  }
});

editarBtn.addEventListener('click', () => {
  ['nome', 'cpf', 'email'].forEach(id => {
    document.getElementById(id).disabled = false;
  });
  salvarBtn.style.display = 'block';
});

deletarBtn.addEventListener('click', async () => {
  const confirmar = confirm('Tem certeza que deseja excluir sua conta?');
  if (confirmar) {
    try {
      const res = await fetch(`http://localhost:3000/api/clientes/${idCliente}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('Conta excluída.');
        localStorage.clear();
        window.location.href = '../pages/principal.html';
      } else {
        alert('Erro ao excluir a conta.');
      }
    } catch (error) {
      alert('Erro de conexão ao excluir.');
      console.error(error);
    }
  }
});

function logout() {
  localStorage.clear();
  window.location.href = '../pages/principal.html';
}

carregarDados();
