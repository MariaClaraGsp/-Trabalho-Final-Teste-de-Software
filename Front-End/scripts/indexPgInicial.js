document.addEventListener('DOMContentLoaded', () => {
    const produtosGrid = document.querySelector('.produtos-home-grid');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const categoryElements = document.querySelectorAll('.category');
    const apiUrl = 'http://localhost:3000/api/produtos'; 
    const loginPageUrl = '/ClienteouAdministrador.html';

    // Função para buscar e exibir os produtos
    async function fetchAndDisplayProducts(filterType = 'all', searchTerm = '') {
        try {
            let url = apiUrl; 

            if (filterType === 'category' && searchTerm) {
                // clique nas categorias
                url = `${apiUrl}/categoria/${encodeURIComponent(searchTerm)}`;
            } else if (filterType === 'search' && searchTerm) {
               //barra de busca por nome
                url = `${apiUrl}/nome/${encodeURIComponent(searchTerm)}`; 
            }
    

            const response = await fetch(url);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                throw new Error(`HTTP error! Status: ${response.status}. Mensagem: ${errorData.mensagem || errorData.error || errorData.message}`);
            }
            const produtos = await response.json();

            produtosGrid.innerHTML = ''; 

            if (produtos.length === 0) {
                produtosGrid.innerHTML = '<p>Nenhum produto encontrado nesta categoria ou com este termo de busca.</p>';
                return;
            }

            produtos.forEach(produto => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card'); 
                productCard.innerHTML = `
                    <div class="imagem-produto"></div> 
                    <p class="nome-produto">${produto.nome}</p>
                    <p class="valor-produto">R$${parseFloat(produto.valor).toFixed(2).replace('.', ',')}</p>
                    <p class="estoque-produto">Estoque: ${produto.estoque}</p>
                    <button class="btn-comprar">Comprar</button>
                `;
                produtosGrid.appendChild(productCard);
            });

            // Adiciona listeners para os botões "Comprar" dinamicamente
            document.querySelectorAll('.btn-comprar').forEach(button => {
                button.addEventListener('click', () => {
                    window.location.href = "cliente.html"; 
                });
            });

        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            produtosGrid.innerHTML = `<p>Erro ao carregar os produtos: ${error.message}</p>`;
        }
    }

    // Carrega todos os produtos na pagina
    fetchAndDisplayProducts('all');

    // Event listeners para categorias e barra de busca
    categoryElements.forEach(categoryDiv => {
        categoryDiv.addEventListener('click', () => {
            const categoryName = categoryDiv.dataset.category; 
            fetchAndDisplayProducts('category', categoryName); 
            searchInput.value = ''; 
        });
    });

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        fetchAndDisplayProducts('search', searchTerm); 
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            fetchAndDisplayProducts('search', searchTerm);
        }
    });
});