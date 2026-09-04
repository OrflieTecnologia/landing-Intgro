document.addEventListener("DOMContentLoaded", () => {
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
