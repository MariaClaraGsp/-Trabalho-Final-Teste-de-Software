document.addEventListener('DOMContentLoaded', () => {
    const produtosGrid = document.querySelector('.produtos-grid');
    const searchInput = document.querySelector('.search');
    const apiUrl = 'http://localhost:3000/api/produtos'; 

    // Função para buscar e exibir os produtos
    async function fetchAndDisplayProducts(searchTerm = '') {
        try {
            let url = apiUrl;
            if (searchTerm) {
                //Buscar por nome
                url = `${apiUrl}/nome/${searchTerm}`; 
            }

            const response = await fetch(url);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                throw new Error(`HTTP error! Status: ${response.status}. Mensagem: ${errorData.mensagem || errorData.error || errorData.message}`);
            }
            const produtos = await response.json();

            produtosGrid.innerHTML = ''; 

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
                    <button class="btn-excluir" data-id="${produto.id_produtos}" data-nome-produto="${produto.nome}">Excluir</button>
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
                    
                    const productId = event.target.dataset.id; 
                    const productNameForConfirm = event.target.dataset.nomeProduto; 

                    if (confirm(`Tem certeza que deseja excluir o produto "${productNameForConfirm}" (ID: ${productId})?`)) {
                        try {
                            const response = await fetch(`${apiUrl}/${productId}`, {
                                method: 'DELETE'
                            });
                            if (!response.ok) {
                                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                                throw new Error(`HTTP error! Status: ${response.status}. Mensagem: ${errorData.mensagem || errorData.error || errorData.message}`);
                            }
                            alert('Produto excluído com sucesso!');
                            fetchAndDisplayProducts(); // Atualiza a lista de produtos
                        } catch (error) {
                            console.error('Erro ao excluir produto:', error);
                            alert(`Erro ao excluir produto. Verifique o console para mais detalhes. Erro: ${error.message}`);
                        }
                    }
                });
            });

        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            produtosGrid.innerHTML = `<p>Erro ao carregar os produtos: ${error.message}</p>`; 
        }
    }

    // Carrega os produtos quando a página é carregada
    fetchAndDisplayProducts();

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            fetchAndDisplayProducts(searchTerm);
        }
    });
});