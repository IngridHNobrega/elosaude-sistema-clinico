O EloSaúde é uma plataforma desenvolvida para facilitar o acesso a informações médicas críticas em situações de emergência. O sistema permite que trabalhadores se cadastrem e gerem um QR Code exclusivo. Em caso de acidente, um socorrista pode escanear o código e, mediante uma senha pública pré-definida, acessar dados vitais como tipo sanguíneo, alergias e contatos de emergência.

✨ Funcionalidades
RF01/02 - Gestão de Acesso: Cadastro e Login seguro com criptografia de senha via bcryptjs.

RF03/04 - Ficha Médica: Edição de perfil clínico (Alergias, Medicamentos, Tipo Sanguíneo, etc).

RF05 - Gerador de QR Code: Geração automática de QR Code vinculado ao perfil do usuário.

RF07/08 - Acesso de Emergência: Painel restrito para socorristas protegido por senha numérica simples.

RF09/10 - Privacidade: Opção de exclusão total de conta e dados sensíveis.

🚀 Tecnologias Utilizadas
Frontend
React.js com Vite

React Router Dom (Navegação)

Axios (Consumo de API)

Bootstrap (Estilização UI)

Backend
Node.js & Express

Prisma ORM (Modelagem de dados)

PostgreSQL (Banco de Dados)

QRCode (Geração de imagens base64)

BcryptJS (Segurança/Hash)

📦 Como rodar o projeto
1. Clone o repositório
Bash
git clone https://github.com/IngridHNobrega/elosaude-sistema-clinico.git
cd elosaude-sistema-clinico
2. Configuração do Backend
Bash
cd backend
npm install
Crie um arquivo .env na pasta backend e adicione a URL do seu banco PostgreSQL:
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE?schema=public"

Execute as migrações do banco:
npx prisma db push

Inicie o servidor:
node index.js

3. Configuração do Frontend
Bash
cd ../frontend
npm install
npm run dev

Privacidade: Dados médicos só são liberados após validação da senhaPublica no lado do servidor.

CORS: Configurado para permitir apenas comunicações autorizadas.

📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

Desenvolvido com 💜 por Ingrid
