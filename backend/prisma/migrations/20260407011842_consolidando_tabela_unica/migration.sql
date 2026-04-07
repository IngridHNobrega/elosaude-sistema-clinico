-- CreateTable
CREATE TABLE "Trabalhador" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaLogin" TEXT NOT NULL,
    "senhaPublica" TEXT,
    "nome" TEXT,
    "sobrenome" TEXT,
    "sexo" TEXT,
    "tipoSanguineo" TEXT,
    "contatoEmergencia" TEXT,
    "alergias" TEXT,
    "medicamentos" TEXT,
    "doencas" TEXT,
    "cirurgias" TEXT,

    CONSTRAINT "Trabalhador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trabalhador_email_key" ON "Trabalhador"("email");
