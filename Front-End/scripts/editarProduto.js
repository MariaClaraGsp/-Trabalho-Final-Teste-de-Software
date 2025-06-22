document.addEventListener('DOMContentLoaded', async () => {
    const formEditarProduto = document.getElementById('form-editar-produto');
    const produtoIdInput = document.getElementById('produto-id');
    const nomeInput = document.getElementById('nome');
    const valorInput = document.getElementById('valor');
    const descricaoInput = document.getElementById('descricao');
    const categoriaInput = document.getElementById('categoria');
    const estoqueInput = document.getElementById('estoque');
    const apiUrl = 'http://localhost:3000/api/produtos'; 

    // Obter o ID do produto da URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        alert('ID do produto não encontrado na URL.');
        window.location.href = 'produtosCadastrados.html'; 
        return;
    }

    // Função para carregar os dados do produto no formulário
    async function loadProductData(id) {
        try {

            const response = await fetch(`${apiUrl}`); // Busca todos os produtos
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const produtos = await response.json();
            const produto = produtos.find(p => p.id_produtos == id); // Encontra o produto pelo ID

            if (produto) {
                produtoIdInput.value = produto.id_produtos;
                nomeInput.value = produto.nome;
                valorInput.value = parseFloat(produto.valor).toFixed(2);
                descricaoInput.value = produto.descricao;
                categoriaInput.value = produto.categoria;
                estoqueInput.value = produto.estoque;
            } else {
                alert('Produto não encontrado.');
                window.location.href = 'produtosCadastrados.html';
            }
        } catch (error) {
            console.error('Erro ao carregar dados do produto:', error);
            alert('Erro ao carregar dados do produto. Verifique o console para mais detalhes.');
            window.location.href = 'produtosCadastrados.html';
        }
    }

    // Carregar os dados do produto quando a página é carregada
    loadProductData(productId);

    // Lidar com o envio do formulário de edição
    formEditarProduto.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const id = produtoIdInput.value;
        const produtoAtualizado = {
            nome: nomeInput.value,
            valor: parseFloat(valorInput.value),
            descricao: descricaoInput.value,
            categoria: categoriaInput.value,
            estoque: parseInt(estoqueInput.value, 10)
        };

        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produtoAtualizado)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.mensagem || errorData.erro}`);
            }

            alert('Produto atualizado com sucesso!');
            window.location.href = 'produtosCadastrados.html'; 
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            alert('Erro ao atualizar produto. Verifique o console para mais detalhes.');
        }
    });
});