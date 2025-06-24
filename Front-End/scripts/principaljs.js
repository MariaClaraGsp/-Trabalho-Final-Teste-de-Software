document.getElementById('profileBtn').addEventListener('click', () => {
  const dropdown = document.getElementById('dropdownMenu');
  dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
});

document.addEventListener('click', (event) => {
  const dropdown = document.getElementById('dropdownMenu');
  const profileBtn = document.getElementById('profileBtn');
  if (!dropdown.contains(event.target) && !profileBtn.contains(event.target)) {
    dropdown.style.display = 'none';
  }
});

document.getElementById('cartBtn').addEventListener('click', () => {
  window.location.href = 'carrinho.html';
});
document.getElementById("meusPedidosLink").addEventListener("click", function() {
  window.location.href = "../pages/meusPedidos.html";  // Caminho da sua tela de pedidos
});
