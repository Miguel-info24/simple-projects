const form = document.getElementById("formContato");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const assunto = document.querySelector('input[name="assunto"]:checked').value;

    const dados = { nome, email, assunto };

    const response = await fetch("/enviar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    const resultado = await response.json();

    document.body.innerHTML = `
        <h1>Formulário enviado com sucesso!</h1>
        <p>${resultado.mensagem}</p>
    `;
});