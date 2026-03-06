.

🌱 UrbanFarm – Sistema de Gestão para Fazenda Urbana

Sistema desenvolvido para gerenciamento de uma fazenda urbana, permitindo o controle de produção, clientes e fornecedores.
O projeto foi desenvolvido como parte do Projeto Integrador Multidisciplinar (PIM) utilizando tecnologias web e também possui uma versão desktop utilizando Electron.


--------------------------------------------------------------------------------------------------------------------------------------------------------


📌 Funcionalidades

O sistema possui um dashboard e módulos de gestão:

📊 Dashboard

Visualização geral do sistema

Indicadores de produção

Acesso rápido aos módulos

👤 Clientes

Cadastro de clientes

Listagem de clientes

Edição e exclusão de registros

🚜 Produção

Registro da produção agrícola

Acompanhamento da produção

📦 Fornecedores

Cadastro de fornecedores

Gerenciamento de informações de contato

--------------------------------------------------------------------------------------------------------------------------------------------------------


🧰 Tecnologias Utilizadas
Frontend

HTML5

CSS3

JavaScript

Backend

Node.js

Express

Banco de Dados

SQLite3

Desktop

Electron

Outras tecnologias

PWA (Progressive Web App)

Service Worker

Manifest

--------------------------------------------------------------------------------------------------------------------------------------------------------


📂 Estrutura do Projeto
fazenda_urbana
│
├── backend
│   ├── server.js
│   ├── main.js
│   └── package.json
│
├── frontend
│   ├── index.html
│   ├── dashboard.html
│   ├── clientes.html
│   ├── fornecedores.html
│   ├── producao.html
│   ├── script.js
│   ├── crudBase.js
│   ├── style.css
│   ├── manifest.json
│   └── service-worker.js
│
└── database
--------------------------------------------------------------------------------------------------------------------------------------------------------
⚙️ Como Rodar o Projeto
1️⃣ Clonar o repositório
git clone https://github.com/oluisvi/fazenda_urbana.git
2️⃣ Instalar dependências

Entre na pasta backend:

cd backend
npm install
3️⃣ Rodar o sistema

Para abrir a versão desktop:

npm start

O Electron abrirá o sistema automaticamente.

🌐 Executar apenas o servidor

Caso queira rodar apenas o backend:

node server.js

Depois abra no navegador:

http://localhost:3000
📱 Progressive Web App (PWA)

O sistema também pode ser executado como aplicação web instalável, permitindo:

Instalação no celular

Funcionamento como aplicativo

Uso offline parcial


📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do Projeto Integrador Multidisciplinar (PIM).
