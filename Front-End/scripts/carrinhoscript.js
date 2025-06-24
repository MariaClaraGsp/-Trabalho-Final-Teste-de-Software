// Produtos adicionados ao carrinho
let produtos = [];

// Quantidade para uso em compra individual (caso necessário)
let quantidade = 1;

// Para uma versão com botão único "comprar"
function alterarQuantidade(delta) {
  quantidade += delta;
  if (quantidade < 1) quantidade = 1;
  document.getElementById("quantidade").innerText = quantidade;
}

// Verifica se foi selecionado para compra
function comprarProduto() {
  const selecionado = document.getElementById("selecionado");
  if (selecionado && !selecionado.checked) {
    alert("Por favor, selecione o produto que deseja comprar.");
    return;
  }
  alert("Compra realizada com sucesso!\nQuantidade: " + quantidade);
}

// Versão separada de incremento/decremento genérico
let quantity = 1;
function increment() {
  quantity++;
  document.getElementById("quantity").textContent = quantity;
}
function decrement() {
  if (quantity > 1) {
    quantity--;
    document.getElementById("quantity").textContent = quantity;
  }
}

// Apenas exibe aviso
function removeItem() {
  alert("Produto removido do carrinho.");
}

// Adiciona novo item ao carrinho
function adicionarProduto(nome, preco) {
  const produtoExistente = produtos.find(p => p.nome === nome);

  if (produtoExistente) {
    produtoExistente.quantidade += 1;
  } else {
    produtos.push({ nome: nome, preco: preco, quantidade: 1 });
  }

  renderizarCarrinho();
}

// Atualiza visualmente o carrinho
function renderizarCarrinho() {
  const container = document.getElementById("carrinho-itens");
  container.innerHTML = "";
  let total = 0;

  produtos.forEach((produto, index) => {
    const subtotal = produto.preco * produto.quantidade;
    total += subtotal;

    container.innerHTML += `
      <div class="card-carrinho">
        <p class="loja">Pata Soft</p>
        <div class="conteudo">
          <div class="img-produto"></div>
          <div class="info-produto">
            <div class="topo">
              <h3>${produto.nome}</h3>
              <span class="remover" onclick="removerProduto(${index})" title="Remover item">🗑️</span>
            </div>
            <p class="preco">R$${produto.preco.toFixed(2)}</p>
            <p class="descricao">Produto adicionado ao carrinho.</p>
            <div class="quantidade">
              <button onclick="alterarQuantidadeItem(${index}, -1)">-</button>
              <span>${produto.quantidade}</span>
              <button onclick="alterarQuantidadeItem(${index}, 1)">+</button>
            </div>
            <button class="btn-comprar" onclick="comprarProduto()">Comprar</button>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById("total-geral").innerText = total.toFixed(2);
}

// Altera quantidade de produto no carrinho
function alterarQuantidadeItem(index, delta) {
  produtos[index].quantidade += delta;
  if (produtos[index].quantidade < 1) produtos[index].quantidade = 1;
  renderizarCarrinho();
}

// Remove item do carrinho
function removerProduto(index) {
  produtos.splice(index, 1);
  renderizarCarrinho();
}

function abrirModal() {
  document.getElementById("modal-pagamento").style.display = "flex";
  // Resetando os formulários e visibilidades
  document.getElementById("form-cartao").style.display = "none";
  document.getElementById("form-pix").style.display = "none";
}

function fecharModal() {
  document.getElementById("modal-pagamento").style.display = "none";
}

function mostrarCartao() {
  document.getElementById("form-cartao").style.display = "block";
  document.getElementById("form-pix").style.display = "none";
}

function mostrarPix() {
  document.getElementById("form-cartao").style.display = "none";
  document.getElementById("form-pix").style.display = "block";
}

function finalizarPagamento(tipo) {
  // Esconde os formulários
  document.getElementById("form-cartao").style.display = "none";
  document.getElementById("form-pix").style.display = "none";

  // Exibe a mensagem de sucesso
  const msg = document.getElementById("mensagem-sucesso");
  msg.innerText = `Pagamento via ${tipo} realizado com sucesso! 🎉`;
  msg.style.display = "block";

  // Opcional: após 3 segundos, fecha o modal automaticamente
  setTimeout(() => {
    fecharModal();
    msg.style.display = "none";
    // Aqui você pode limpar o carrinho ou redirecionar, se quiser
  }, 3000);
}


// Inicializa a tela
renderizarCarrinho();