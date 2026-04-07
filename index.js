// importando as ferramentas necessarias
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const app = express();
const prisma = new PrismaClient();

// permitindo que o frontend converse com o backend
app.use(cors());
app.use(express.json());

// rota de cadastro (rf01 e us01)
app.post('/cadastro', async (req, res) => {
  try {
    const { email, senha } = req.body;
    // criptografando a senha (rnf01)
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.trabalhador.create({
      data: { email, senhaLogin: senhaCriptografada }
    });
    res.status(201).json({ mensagem: 'conta criada com sucesso!' });
  } catch (error) {
    res.status(400).json({ erro: 'erro ao criar conta ou email ja existe.' });
  }
});

// rota de login (rf02 e us02)
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await prisma.trabalhador.findUnique({ where: { email } });

  if (!usuario || !(await bcrypt.compare(senha, usuario.senhaLogin))) {
    return res.status(401).json({ erro: 'email ou senha incorretos.' });
  }
  // em um projeto real, usariamos token jwt aqui. para simplificar, enviamos o id
  res.json({ id: usuario.id, mensagem: 'login bem sucedido!' });
});

// rota para apagar a conta (rf09 e us09)
app.delete('/conta/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.trabalhador.delete({ where: { id } });
  res.json({ mensagem: 'conta apagada com sucesso.' });
});

// ligando o servidor na porta 3000
app.listen(3000, () => {
  console.log('servidor rodando na porta 3000');
});