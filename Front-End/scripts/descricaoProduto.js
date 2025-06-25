document.addEventListener('DOMContentLoaded', () => {
    const produto = JSON.parse(localStorage.getItem('produtoSelecionado'));

    if (!produto) {
        alert('Nenhum produto selecionado.');
        window.location.href = 'principal.html'; // Redireciona se não houver produto
        return;
    }


    // Atualiza nome
    document.querySelector('.produto-info h2').textContent = produto.nome;

    // Atualiza preço
    const precoFormatado = `R$${parseFloat(produto.valor).toFixed(2).replace('.', ',')}`;
    document.querySelector('.preco').textContent = precoFormatado;

    // Atualiza descrição (usa texto genérico se não vier nada)
    document.querySelector('.descricao').textContent = produto.descricao || 'Sem descrição disponível.';

    // Atualiza avaliação (opcional)
    const avaliacao = produto.avaliacao || 'N/A';
    document.querySelector('.avaliacao').textContent = `Avaliação: ${avaliacao}`;

    // Atualiza estoque e vendidos
    const vendidos = produto.vendidos || 0;
    const estoque = produto.estoque || 0;
    document.querySelector('.estoque').innerHTML = `
        ${vendidos} produtos vendidos &nbsp;&nbsp;&nbsp;
        <strong>${estoque} produtos em estoque</strong>
    `;
});
