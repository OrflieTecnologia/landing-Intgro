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

  // Carrossel de clientes
  const carousel = document.querySelector(".clients-carousel");
  if (carousel) {
    const track = carousel.querySelector(".clients-track");
    const prev = carousel.querySelector(".carousel-prev");
    const next = carousel.querySelector(".carousel-next");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Largura de um passo = tile + gap
    const stepSize = () => {
      const tile = track.querySelector(".client-logo");
      if (!tile) return track.clientWidth;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return tile.getBoundingClientRect().width + gap;
    };

    // Atualiza o estado (habilitado/desabilitado) das setas
    const updateButtons = () => {
      if (!prev || !next) return;
      const maxScroll = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= maxScroll;
    };

    if (next) {
      next.addEventListener("click", () =>
        track.scrollBy({ left: stepSize(), behavior: "smooth" })
      );
    }
    if (prev) {
      prev.addEventListener("click", () =>
        track.scrollBy({ left: -stepSize(), behavior: "smooth" })
      );
    }

    track.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    updateButtons();

    // Autoplay suave, com loop e pausa na interação
    if (!reduceMotion) {
      const INTERVAL = 3000;
      let timer = null;

      const advance = () => {
        const maxScroll = track.scrollWidth - track.clientWidth - 2;
        if (track.scrollLeft >= maxScroll) {
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          track.scrollBy({ left: stepSize(), behavior: "smooth" });
        }
      };

      const start = () => {
        stop();
        timer = setInterval(advance, INTERVAL);
      };
      const stop = () => {
        if (timer) clearInterval(timer);
        timer = null;
      };

      start();
      ["mouseenter", "focusin", "touchstart", "pointerdown"].forEach((ev) =>
        carousel.addEventListener(ev, stop, { passive: true })
      );
      ["mouseleave", "focusout"].forEach((ev) =>
        carousel.addEventListener(ev, start)
      );
    }
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
