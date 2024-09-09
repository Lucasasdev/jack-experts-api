# Jack Experts API

## Sobre
API de tarefas, possibilita adicionar usuários e suas tarefas e manipular essas tarefas com os príncipais métodos HTTP (get, post, update e delete). Além disso,verifica se o usuário é autenticado ao logar por meio da autenticação Json Web Token (JWT).

## Instalação
### Requisitos:
- Node ^18.0
- npm ^1.0
- Mysql (com server cloud ou Local fica como preferência).

### Executar a aplicação:
#### 1. Cole o comando no seu terminal em alguma pasta de sua preferência: `git clone https://github.com/Lucasasdev/jack-expert-api.git`.

#### 2. Entre no diretório onde clonou o projeto execute o comando para instalar as dependências: `npm install`.

#### 3. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:
URI do banco de dados MySQL pelo qual se deseja conectar:
Exemplo: `DATABASE_URL='valor'`
- Porta local onde a API será hosteada: 
Exemplo: `PORT='valor'`
- É necessário uma key secret (hash) para que o JWT use para autenticar e verificar a autenticidade do usuário:
#### 3. Essa hash pode ser gerada fácilmente com a biblioteca nativa do node Crypto.

Exemplo: `JWT_SECRET='valor'`

#### 4. Inicie a aplicação: `npm start dev`

## Princiais Tecnologias
- **Mysql em Cloud** Banco relacional para persistência de dados;
- **Prisma (ORM)**: para facilitar a integração e manipulação de banco de dados;
- **Node.js**: ambiente de execução para JS;
- **TypeScript**: para ajudar a capturar erros em tempo de execução;
- **Jest e SuperFast**: para executar testes unitários e de integração e garantir a confiabilidade do sistema;
- **Eslint, Prettier e Husky**: para garantir a consistência, melhor legibilidade e qualidade do código.
