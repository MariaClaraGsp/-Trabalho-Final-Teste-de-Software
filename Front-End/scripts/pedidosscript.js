function showTab(button) {
  const tabId = button.getAttribute("data-tab");

  const contents = document.querySelectorAll(".tab-content");
  contents.forEach(content => content.style.display = "none");

  const tabContent = document.getElementById(tabId);
  if (tabContent) {
    tabContent.style.display = "block";
  }

  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");

  const main = document.querySelector("main");
  if (main) main.style.display = "none";

  const pedidosContainer = document.getElementById("pedidosContainer");
  if (pedidosContainer) pedidosContainer.style.display = "block";

  const carrinhoContainer = document.getElementById("carrinhoContainer");
  if (carrinhoContainer) carrinhoContainer.style.display = "none";
}
