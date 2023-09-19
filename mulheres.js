const express = require("express");
const router = express.Router("");

const app = express();
const porta=3333;

const mulheres = [
    {
        nome: 'Mirraely Moura',
        imagem: 'https://github.com/mirraelly.jpg',
        minibio: 'Desenvolvedora Web e Design UX'
    },
    {
        nome: 'Iana Chan',
        imagem: 'https://bit.ly/3JCXBqP',
        minibio: 'Fundadora da PrograMaria'
    },
    {
        nome: 'Nina da Hora',
        imagem: 'https://bit.ly/3FKpFaz',
        minibio: 'Hacker antirracista'
    }
];

function mostraMulheres(request, response) {
    response.json(mulheres);
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta" , porta)
}

app.use(router.get("/mulheres", mostraMulheres));
app.listen(porta, mostraPorta);
