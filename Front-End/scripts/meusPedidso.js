function showTab(tabId) {
  // Esconder todas as abas
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach(content => content.style.display = "none");

  // Exibir a aba selecionada
  document.getElementById(tabId).style.display = "block";


  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach(btn => btn.classList.remove("active"));

  // Ativar o botão correspondente
  const activeBtn = Array.from(buttons).find(btn => btn.getAttribute('data-tab') === tabId);
  if (activeBtn) activeBtn.classList.add("active");
}
