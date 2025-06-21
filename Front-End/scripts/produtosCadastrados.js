document.addEventListener('DOMContentLoaded', () => {
    const produtosGrid = document.querySelector('.produtos-grid');
    const searchInput = document.querySelector('.search');
    const apiUrl = 'http://localhost:3000/api/produtos'; // Altere para a URL correta da sua API

    // Função para buscar e exibir os produtos
    async function fetchAndDisplayProducts(searchTerm = '') {
        try {
            let url = apiUrl;
            if (searchTerm) {
                // Se houver um termo de busca, use a rota de busca por nome ou categoria
                // Você pode adaptar isso para buscar por nome ou categoria, ou criar uma rota de busca mais genérica na sua API
                url = `${apiUrl}/nome/${searchTerm}`; // Exemplo: buscar por nome
                // Ou, se você quiser buscar por categoria:
                // url = `${apiUrl}/categoria/${searchTerm}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const produtos = await response.json();

            produtosGrid.innerHTML = ''; // Limpa os produtos existentes

            if (produtos.length === 0) {
                produtosGrid.innerHTML = '<p>Nenhum produto encontrado.</p>';
                return;
            }

            produtos.forEach(produto => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <div class="imagem-produto"></div>
                    <p class="nome">${produto.nome}</p>
                    <p>Valor: R$${parseFloat(produto.valor).toFixed(2).replace('.', ',')}</p>
                    <p>Estoque: ${produto.estoque}</p>
                    <button class="btn-editar" data-id="${produto.id_produtos}">Editar</button>
                    <button class="btn-excluir" data-nome="${produto.nome}">Excluir</button>
                `;
                produtosGrid.appendChild(card);
            });

            // Adiciona event listeners para os botões de editar e excluir
            document.querySelectorAll('.btn-editar').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = event.target.dataset.id;
                    window.location.href = `editarProduto.html?id=${productId}`;
                });
            });

            document.querySelectorAll('.btn-excluir').forEach(button => {
                button.addEventListener('click', async (event) => {
                    const productName = event.target.dataset.nome;
                    if (confirm(`Tem certeza que deseja excluir o produto "${productName}"?`)) {
                        try {
                            const response = await fetch(`${apiUrl}/${productName}`, {
                                method: 'DELETE'
                            });
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            alert('Produto excluído com sucesso!');
                            fetchAndDisplayProducts(); // Atualiza a lista de produtos
                        } catch (error) {
                            console.error('Erro ao excluir produto:', error);
                            alert('Erro ao excluir produto. Verifique o console para mais detalhes.');
                        }
                    }
                });
            });

        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            produtosGrid.innerHTML = '<p>Erro ao carregar os produtos.</p>';
        }
    }

    // Carrega os produtos quando a página é carregada
    fetchAndDisplayProducts();

    // Adiciona o evento de busca ao campo de pesquisa
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            fetchAndDisplayProducts(searchTerm);
        }
    });
});