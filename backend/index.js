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
        const linkPublico = `http://192.168.0.7/perfil-emergencia/${novoUsuario.id}`;

        // 3. geramos o qr code em formato de imagem (base64)
        const qrCodeImagem = await QRCode.toDataURL(linkPublico);

        // enviamos a resposta com o qr code para o frontend guardar
        res.status(201).json({ 
            id: novoUsuario.id, 
            mensagem: 'conta criada!',
            qrCode: qrCodeImagem 
        });

    } catch (error) {
        console.error("ERRO DETALHADO NO CADASTRO:", error); //
        res.status(400).json({ erro: 'erro ao criar conta.' });
    }
});

// rota para atualizar a ficha medica e definir senha publica (rf03 e rf04)
app.put('/perfil/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;

        // Se tiver senha pública, criptografa
        if (dados.senhaPublica) {
            dados.senhaPublica = await bcrypt.hash(dados.senhaPublica, 10);
        }

        const usuarioAtualizado = await prisma.trabalhador.update({
            where: { id },
            data: dados
        });

        res.json({ mensagem: 'perfil atualizado com sucesso!' });

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

// rota de login (RF02 e US02)
app.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        // 1. Procura o usuário pelo email
        const usuario = await prisma.trabalhador.findUnique({ where: { email } });
        
        // 2. Se não achar ou a senha estiver errada, bloqueia o acesso
        if (!usuario) {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
        }

        // 3. Compara a senha digitada com a criptografada no banco
        const senhaValida = await bcrypt.compare(senha, usuario.senhaLogin);
        if (!senhaValida) {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
        }

        // 4. Se tudo der certo, retorna o ID do usuário para o front-end saber quem logou
        res.status(200).json({ mensagem: 'Login com sucesso!', id: usuario.id });
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno no servidor ao fazer login.' });
    }
});

// rota socorrista (Segura) (RF07 e RF08)
// pois pois é necessario enviar a senha do frontend - backend
app.post('/ficha-publica/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { senhaDigitada } = req.body; // A senha que o socorrista digitou no celular

        // 1. Busca o trabalhador no banco
        const ficha = await prisma.trabalhador.findUnique({ where: { id } });

        // 2. Se não achar (ou se a conta foi apagada), dá erro 404
        if (!ficha) {
            return res.status(404).json({ erro: 'Página não encontrada.' });
        }

        // 3. Verifica se a senha pública bate com a que está salva
        const senhaValida = await bcrypt.compare(senhaDigitada, ficha.senhaPublica);
        if (!senhaValida) {
            return res.status(401).json({ erro: 'Senha pública incorreta.' });
        }

        // 4. Se a senha está correta, envia os dados médicos (nunca as senhas!)
        res.json({
            nome: ficha.nome,
            sobrenome: ficha.sobrenome,
            sexo: ficha.sexo,
            tipoSanguineo: ficha.tipoSanguineo,
            contatoEmergencia: ficha.contatoEmergencia,
            alergias: ficha.alergias,
            medicamentos: ficha.medicamentos,
            doencas: ficha.doencas,
            cirurgias: ficha.cirurgias
        });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar a ficha.' });
    }
});

// rota apagar conta (RF09 e RF10) 
app.delete('/perfil/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Deleta o registro do banco de dados
        await prisma.trabalhador.delete({ where: { id } });

        res.status(200).json({ mensagem: 'Conta e dados apagados com sucesso!' });
    } catch (error) {
        res.status(400).json({ erro: 'Erro ao apagar a conta. Pode já ter sido apagada.' });
    }
});


// ligando o servidor
const porta = 3000;
app.listen(porta, () => {
    console.log(`servidor rodando em http://localhost:${porta}`);
});