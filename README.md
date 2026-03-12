# 🌱 UrbanFarm – Sistema de Gestão para Fazenda Urbana

UrbanFarm é um sistema web desenvolvido para gerenciamento de uma fazenda urbana, permitindo o controle de produção agrícola, clientes e fornecedores.

O projeto foi desenvolvido como parte do **Projeto Integrador Multidisciplinar (PIM)** e utiliza tecnologias web modernas, além de possuir uma **versão desktop construída com Electron**.

---

# 🌐 Demonstração Online

O sistema pode ser acessado online através do link:

https://fazenda-urbana.onrender.com/

---

# 📌 Funcionalidades

O sistema possui um dashboard e módulos de gestão que permitem acompanhar e administrar as operações da fazenda urbana.

## 📊 Dashboard

O dashboard apresenta uma visão geral do sistema:

* Total de produções registradas
* Quantidade total produzida (Kg)
* Gráfico de produção por cultura
* Acesso rápido aos módulos do sistema

## 🚜 Produção

* Registro da produção agrícola
* Controle de culturas produzidas
* Registro da quantidade produzida por data
* Histórico completo de produção

## 👤 Clientes

* Cadastro de clientes
* Listagem de clientes
* Edição de registros
* Exclusão de registros

## 📦 Fornecedores

* Cadastro de fornecedores
* Gerenciamento de informações de contato
* Atualização de registros
* Exclusão de fornecedores

---

# 🔐 Autenticação

O sistema possui controle de acesso com login de usuários.

Usuários padrão são criados automaticamente ao iniciar o sistema:

**Administrador**
email: [admin@admin.com](mailto:admin@admin.com)
senha: 1234

**Usuário padrão**
email: [user@user.com](mailto:user@user.com)
senha: 1234

---

# 🧰 Tecnologias Utilizadas

## Frontend

* HTML5
* CSS3
* JavaScript

## Backend

* Node.js
* Express

## Banco de Dados

* SQLite3

## Desktop

* Electron

## Outras Tecnologias

* PWA (Progressive Web App)
* Service Worker
* Web App Manifest

---

# 🏗 Arquitetura do Sistema

O sistema utiliza uma arquitetura **Full Stack JavaScript**.

O backend desenvolvido em **Node.js com Express** também é responsável por servir os arquivos do frontend, permitindo que toda a aplicação funcione em um único servidor.

Além disso, o backend expõe uma **API REST** responsável pelo gerenciamento de:

* Produção
* Clientes
* Fornecedores
* Dashboard
* Autenticação de usuários

---

# 💾 Banco de Dados

O sistema utiliza **SQLite3** como banco de dados.

Em ambiente de produção (Render), o banco é armazenado em **disco persistente**, garantindo que os dados não sejam perdidos após reinicialização do servidor.

---

# 📂 Estrutura do Projeto

```
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
└── database.db
```

---

# ⚙️ Como Rodar o Projeto

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/oluisvi/fazenda_urbana.git
```

---

## 2️⃣ Instalar dependências

Entre na pasta backend:

```bash
cd backend
npm install
```

---

## 3️⃣ Rodar o sistema

Para abrir a **versão desktop com Electron**:

```bash
npm start
```

O Electron abrirá o sistema automaticamente.

---

# 🌐 Executar apenas o servidor

Caso queira rodar apenas o backend:

```bash
node server.js
```

Depois abra no navegador:

```
http://localhost:3000
```

---

# 📱 Progressive Web App (PWA)

O sistema também pode ser executado como **aplicação web instalável**, permitindo:

* Instalação no celular
* Funcionamento como aplicativo
* Uso offline parcial através de Service Worker

---

# 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do **Projeto Integrador Multidisciplinar (PIM)**.
