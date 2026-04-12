// importando as ferramentas
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const QRCode = require('qrcode'); // importando a ferramenta de qr code

// rota de cadastro atualizada (rf01 e rf05)
app.post('/cadastro', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // 1. criamos o usuario no banco de dados
        const novoUsuario = await prisma.trabalhador.create({
            data: { 
                email, 
                senhaLogin: senhaCriptografada 
            }
        });

        // 2. o link que o qr code vai carregar
        // dps trocar o 'localhost:5173' pelo link real do site
        const linkPublico = `http://localhost:5173/perfil-emergencia/${novoUsuario.id}`;

        // 3. geramos o qr code em formato de imagem (base64)
        const qrCodeImagem = await QRCode.toDataURL(linkPublico);

        // enviamos a resposta com o qr code para o frontend guardar
        res.status(201).json({ 
            id: novoUsuario.id, 
            mensagem: 'conta criada!',
            qrCode: qrCodeImagem 
        });

    } catch (error) {
        res.status(400).json({ erro: 'erro ao criar conta.' });
    }
});

// rota para atualizar a ficha medica e definir senha publica (rf03 e rf04)
app.put('/perfil/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body; // aqui será nome, tipo sanguineo, senha publica, etc.

        const usuarioAtualizado = await prisma.trabalhador.update({
            where: { id },
            data: dados
        });

        res.json({ mensagem: 'perfil atualizado com sucesso!', usuarioAtualizado });
    } catch (error) {
        res.status(400).json({ erro: 'erro ao atualizar perfil.' });
    }
});

// rota para o socorrista ver os dados (rf07 e rf08)
// nota: esta rota sera protegida pela senha publica no frontend
app.get('/ficha-publica/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ficha = await prisma.trabalhador.findUnique({
            where: { id },
            select: {
                nome: true,
                sobrenome: true,
                sexo: true,
                tipoSanguineo: true,
                contatoEmergencia: true,
                alergias: true,
                medicamentos: true,
                doencas: true,
                cirurgias: true,
                senhaPublica: true // enviaremos para validar no front
            }
        });

        if (!ficha) return res.status(404).json({ erro: 'ficha nao encontrada.' });
        res.json(ficha);
    } catch (error) {
        res.status(500).json({ erro: 'erro ao buscar ficha.' });
    }
});

// ligando o servidor
const porta = 3000;
app.listen(porta, () => {
    console.log(`servidor rodando em http://localhost:${porta}`);
});