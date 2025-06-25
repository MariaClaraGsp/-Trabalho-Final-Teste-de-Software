document.addEventListener('DOMContentLoaded', async () => {
    // Obtenção dos elementos do DOM
    const formMeusDados = document.getElementById('formMeusDados');
    const nomeInput = document.getElementById('nome');
    const cpfInput = document.getElementById('cpf');
    const emailInput = document.getElementById('email');
    const editarBtn = document.getElementById('editarBtn');
    const deletarBtn = document.getElementById('deletarBtn');
    const salvarBtn = document.getElementById('salvarBtn');
    const logoutBtn = document.getElementById('logoutBtn'); 

    // Obtenção do ID do cliente do localStorage
    const idCliente = localStorage.getItem('id');
    const apiUrlClientes = 'http://localhost:3000/api/clientes';

    // Se o ID do cliente não for encontrado, redireciona para a página principal
    if (!idCliente) {
        alert('ID do cliente não encontrado. Redirecionando para a página principal.');
        window.location.href = '../pages/principal.html';
        return;
    }

    // Função para carregar os dados do cliente no formulário
    async function carregarDadosCliente() {
        try {
            const response = await fetch(`${apiUrlClientes}/${idCliente}`);
            if (!response.ok) {
                // Se a resposta não for OK (ex: 404 Not Found), lança um erro
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Preenche os campos do formulário
            nomeInput.value = data.nome;
            cpfInput.value = data.cpf;
            emailInput.value = data.email;

            // Desabilita os campos inicialmente
            nomeInput.disabled = true;
            cpfInput.disabled = true;
            emailInput.disabled = true;
            salvarBtn.style.display = 'none'; // Oculta o botão Salvar inicialmente

        } catch (error) {
            console.error('Erro ao carregar os dados do cliente:', error);
            alert('Erro ao carregar seus dados. Verifique o console para mais detalhes.');
            window.location.href = '../pages/principal.html'; // Redireciona em caso de erro
        }
    }

    // Lida com o envio do formulário de atualização de dados
    formMeusDados.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previne o comportamento padrão de envio do formulário

        const dadosAtualizados = {
            nome: nomeInput.value,
            cpf: cpfInput.value,
            email: emailInput.value,
        };

        try {
            const response = await fetch(`${apiUrlClientes}/${idCliente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosAtualizados)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.mensagem || errorData.erro || 'Erro desconhecido'}`);
            }

            alert('Seus dados foram atualizados com sucesso!');
            // Recarrega os dados e desabilita os campos após a atualização
            await carregarDadosCliente();

        } catch (error) {
            console.error('Erro ao atualizar seus dados:', error);
            alert('Erro ao atualizar seus dados. Verifique o console para mais detalhes.');
        }
    });

    // Lida com o clique no botão Editar
    editarBtn.addEventListener('click', () => {
        nomeInput.disabled = false;
        cpfInput.disabled = false;
        emailInput.disabled = false;
        salvarBtn.style.display = 'block'; // Mostra o botão Salvar
    });

    // Lida com o clique no botão Deletar
    deletarBtn.addEventListener('click', async () => {
        const confirmar = confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.');
        if (confirmar) {
            try {
                const response = await fetch(`${apiUrlClientes}/${idCliente}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.mensagem || errorData.erro || 'Erro desconhecido'}`);
                }

                alert('Sua conta foi excluída com sucesso!');
                localStorage.clear(); // Limpa todos os dados do localStorage
                window.location.href = '../pages/principal.html'; // Redireciona para a página principal

            } catch (error) {
                console.error('Erro ao excluir a conta:', error);
                alert('Erro ao excluir sua conta. Verifique o console para mais detalhes.');
            }
        }
    });

    // Função para logout
    function logout() {
        localStorage.clear(); // Limpa o localStorage ao deslogar
        window.location.href = '../pages/principal.html'; // Redireciona para a página principal
    }

    // Adiciona o event listener para o botão de logout, se ele existir
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Carrega os dados do cliente assim que o DOM estiver pronto
    carregarDadosCliente();
});