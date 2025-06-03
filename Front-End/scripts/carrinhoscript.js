
let quantidade = 1;

function alterarQuantidade(delta) {
  quantidade += delta;
  if (quantidade < 1) quantidade = 1;
   document.getElementById("quantidade").innerText = quantidade;
  }

function comprarProduto() {
  const selecionado = document.getElementById("selecionado").checked;
  if (!selecionado) {
    alert("Por favor, selecione o produto que deseja comprar.");
     return;
  }

  alert("Compra realizada com sucesso!\nQuantidade: " + quantidade);
}

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

function removeItem() {
  alert("Produto removido do carrinho.");
}
