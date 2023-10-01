const express = require("express"); // iniciando o express
const router = express.Router(""); // configurando a primeira parte da rota
const cors = require('cors'); // trazendo o pacote cors, que permite consumir essa api no front-end
const conectaBancoDeDados = require('./bancoDeDados'); // ligando ao arquivo Banco de Dados
conectaBancoDeDados(); // chamando a função que conecta o Banco de Dados

const Mulher = require('./mulherModel');

const app = express(); // iniciando o app
app.use(express.json());
app.use(cors());

const porta = 3333; // criando a porta 

// GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find();

        responsde.json(mulheresVindasDoBancoDeDados);
    } catch (erro) {
        console.log(erro);
    }

}

// POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao,
    });

    try {
        const mulherCriada = await novaMulher.save();
        response.status(201).json(mulherCriada);

    } catch (erro) {
        console.log(erro);
    }
}

// PATCH
async function corrigeMulher(request, response) {

    try {
        const mulherEncontrada = await Mulher.findById(request.params.id);

        if (request.body.name) {
            mulherEncontrada.nome = request.body.nome
        }

        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio;
        }

        if (request.body.imagem) {
            mulherEncontrada = request.body.imagem;
        }

        if (request.body.citacao) {
            mulherEncontrada = request.body.citacao;
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save();
        response.json(mulherAtualizadaNoBancoDeDados);
    } catch (erro) {
        console.log(erro);
    }

}

// DELETE
async function deletaMulher(request, response) {
  try {
    await Mulher.findByIdAndDelete(request.params.id);
    response.json({mensagem: 'Mulher deletada com sucesso!'});
  } catch (erro) {
    console.log(erro);
  }
}

app.use(router.get("/mulheres", mostraMulheres)); // configurando a rota GET / mulheres
app.use(router.post("/mulheres", criaMulher)); // configurando rota POST / mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)); // configurando a rota PATCH/ mulheres /: id
app.use(router.delete("/mulheres/:id", deletaMulher)); //configurando a rota delete / mulheres /: id 

// PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.listen(porta, mostraPorta); // servidor ouvindo a porta 
