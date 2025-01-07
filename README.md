
# In.Orbit Server

O backend para o projeto <a target='_blank' href='https://github.com/omarcolombari/in-orbit'>**In.Orbit**.</a> Este servidor fornece uma API para gerenciar as metas dos usuários e integrações, como autenticação via GitHub. Ele utiliza tecnologias modernas para oferecer desempenho e escalabilidade.

## 🚀 Tecnologias

As principais tecnologias utilizadas no projeto são:

- [Fastify](https://www.fastify.io/) - Framework web rápido e eficiente
- [Drizzle ORM](https://orm.drizzle.team/) - ORM leve e moderno para TypeScript
- [Docker](https://www.docker.com/) - Ferramenta de containerização
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional robusto

## 🌐 Configuração do GitHub OAuth

Para configurar a autenticação via GitHub, siga os passos abaixo:

1. Acesse o [GitHub Developer Settings](https://github.com/settings/developers).
2. Clique em "New OAuth App".
3. Preencha os campos obrigatórios:
   - **Application name**: Nome da aplicação (ex.: In.Orbit Server)
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/auth/callback`
4. Após criar a aplicação, copie o `Client ID` e o `Client Secret`.

Você precisará adicionar essas credenciais ao arquivo `.env` do projeto nas variáveis `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET`.

## 📦 Instalação

Siga os passos abaixo para configurar o backend localmente:

### Pré-requisitos

- Node.js (v20 ou superior)
- Docker e Docker Compose

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/omarcolombari/in-orbit-server.git
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd in-orbit-server
   ```

3. Instale as dependências:
   ```bash
   pnpm install
   ```

4. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```env
   NODE_ENV=development
   DATABASE_URL=postgresql://<USUARIO>:<SENHA>@localhost:5432/inorbit
   GITHUB_CLIENT_ID=<SUA_CLIENT_ID>
   GITHUB_CLIENT_SECRET=<SEU_CLIENT_SECRET>
   JWT_SECRET=<SUA_CHAVE_SECRETA>
   ```

   - **NODE_ENV**: Define o ambiente (desenvolvimento ou produção).
   - **DATABASE_URL**: URL de conexão com o banco de dados PostgreSQL.
   - **GITHUB_CLIENT_ID** e **GITHUB_CLIENT_SECRET**: Credenciais para autenticação via GitHub.
   - **JWT_SECRET**: Chave secreta para geração de tokens JWT.

5. Inicie o container do PostgreSQL com Docker:
   ```bash
   docker-compose up -d
   ```

6. Execute as migrações do banco de dados:
   ```bash
   pnpm run db:migrate
   ```

7. Inicie o servidor:
   ```bash
   pnpm run dev
   ```

A API estará disponível em: [http://localhost:3333](http://localhost:3333)


Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais informações.
