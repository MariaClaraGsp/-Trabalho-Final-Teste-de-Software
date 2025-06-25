document.getElementById('profileBtn').addEventListener('click', () => {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';

});

document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('dropdownMenu');
    const profileBtn = document.getElementById('profileBtn');
        if (!dropdown.contains(event.target) && !profileBtn.contains(event.target)) {
    }
});

document.getElementById('cartBtn').addEventListener('click', () => {
    window.location.href = 'carrinho.html';
});

document.getElementById("meusPedidosLink").addEventListener("click", function() {
    window.location.href = "meusPedidos.html";  // Caminho da sua tela de pedidos

});

document.getElementById("meusDadosLink").addEventListener("click", function() {
    window.location.href = "meusDados.html";  // Caminho da sua tela de pedidos

});


document.addEventListener('DOMContentLoaded', () => {
    const produtosGrid = document.querySelector('.produtos-home-grid');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const categoryElements = document.querySelectorAll('.category');
    const apiUrl = 'http://localhost:3000/api/produtos';

    // Função para buscar e exibir os produtos
    async function fetchAndDisplayProducts(filterType = 'all', searchTerm = '') {
        try {
            let url = apiUrl;

            if (filterType === 'category' && searchTerm) {
                url = `${apiUrl}/categoria/${encodeURIComponent(searchTerm)}`;
            } else if (filterType === 'search' && searchTerm) {
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

                const comprarButton = productCard.querySelector('.btn-comprar');
                comprarButton.addEventListener('click', () => {
                    // Salva o objeto produto completo no localStorage
                    localStorage.setItem('produtoSelecionado', JSON.stringify(produto));
                    // Redireciona para a página de descrição do produto
                    window.location.href = "descricaoProduto.html";
                });
             

                produtosGrid.appendChild(productCard);
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

// Listener para o botão de Sair (se estiver no JS)
document.addEventListener('DOMContentLoaded', () => {
    const logoutDiv = document.querySelector('.logout');
    if (logoutDiv) {
        logoutDiv.addEventListener('click', () => {
            window.location.href = "index.html"; // Redireciona para index.html
        });
    }
});