const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post("/enviar", (req, res) => {
    console.log(" JSON recebido:");
    console.log(req.body);

    res.json({ mensagem: "Formulário recebido com sucesso!" });
});

app.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`);
});