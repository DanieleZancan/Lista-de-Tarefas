# Lista de Tarefas
## Descrição
Este é um projeto de uma aplicação de Lista de Tarefas, onde é possível cadastrar, editar, excluir e ordenar tarefas de acordo com o nome, custo e data limite. A aplicação é composta por:

### Front-end: Desenvolvido utilizando React.
### Back-end: API criada com Node.js e Express.
### Banco de Dados: Utiliza um banco de dados MongoDB para persistência das tarefas.
## Funcionalidades
- Cadastrar novas tarefas com nome, custo e data limite.
- Editar tarefas já cadastradas.
- Excluir tarefas.
- Ordenar as tarefas por nome, custo ou data limite.
- Interface interativa e fácil de usar.
## Tecnologias Utilizadas
## Front-end:

- React
- React Hooks
- React Icons (para os ícones de editar e excluir)
## Back-end:

- Node.js
- Express
## Banco de Dados:

- MongoDB (ou outro banco, conforme sua escolha)
## Outras:

- Axios (para fazer requisições HTTP)
- dotenv (para variáveis de ambiente)
- Cors (para permitir requisições entre diferentes origens)

# Como Rodar o Projeto
## 1. Clonando o Repositório
bash  
git clone https://github.com/DanieleZancan/Lista-de-Tarefas.git

## 2. Configurando o Backend
1.Entre na pasta do backend:
bash  
cd backend

2.Instale as dependências:
bash  
npm install

3.Configure as variáveis de ambiente (crie um arquivo .env na raiz do diretório backend com as seguintes variáveis):
env  
MONGO_URI=seu_link_do_mongo
PORT=3333

4.Inicie o servidor:
bash  
npm start
O back-end estará rodando na URL http://localhost:3333.

## 3. Configurando o Frontend
1.Entre na pasta do front-end:
bash  
cd frontend

2.Instale as dependências:
bash  
npm install

3.Inicie o front-end:
bash  
npm start
O front-end estará acessível em http://localhost:3333.

## Estrutura de Pastas
- frontend/: Contém a aplicação React (pasta do front-end).
- backend/: Contém a API Express (pasta do back-end).
- README.md: Este arquivo com instruções e informações sobre o projeto.
