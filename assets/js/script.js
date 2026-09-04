document.addEventListener("DOMContentLoaded", () => {
  // Menu hambúrguer (mobile)
  const toggle = document.querySelector(".menu-toggle");
  const navContainer = document.querySelector(".nav-container");

  if (toggle && navContainer) {
    const closeMenu = () => {
      navContainer.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    };

    toggle.addEventListener("click", () => {
      const isOpen = navContainer.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    // Fecha ao clicar em qualquer link/botão do menu
    navContainer
      .querySelectorAll(".menu a, .menu-btn-contact a")
      .forEach((link) => link.addEventListener("click", closeMenu));

    // Fecha com a tecla Esc
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const form = document.querySelector("#contact form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();

    if (!nome || !email || !mensagem) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    // TODO: substituir por uma chamada real a um backend/serviço de e-mail
    alert(`Obrigado, ${nome}! Sua mensagem foi recebida (envio ainda não conectado a um servidor).`);
    form.reset();
  });
});
