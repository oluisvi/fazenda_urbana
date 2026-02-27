const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db');

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      preco REAL,
      estoque INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS fornecedores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT,
      email TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS producao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produto_id INTEGER,
      quantidade INTEGER,
      data TEXT,
      FOREIGN KEY(produto_id) REFERENCES produtos(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT,
      email TEXT
    )
  `);

  // Criar admin padrão se não existir
    db.get("SELECT * FROM usuarios WHERE email = ?", ["admin@admin.com"], (err, row) => {
  if (!row) {
    db.run(`
      INSERT INTO usuarios (nome, email, senha, role)
      VALUES (?, ?, ?, ?)
    `, ["Administrador", "admin@admin.com", "1234", "admin"]);
    console.log("Admin padrão criado 🚀");
  }
    });

    // Criar usuário padrão se não existir
db.get("SELECT * FROM usuarios WHERE email = ?", ["user@user.com"], (err, row) => {
  if (!row) {
    db.run(`
      INSERT INTO usuarios (nome, email, senha, role)
      VALUES (?, ?, ?, ?)
    `, ["Usuário Padrão", "user@user.com", "1234", "user"]);
    console.log("Usuário padrão criado 🚀");
  }
});

});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.get(
    "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
    [email, senha],
    (err, row) => {
      if (err) {
        return res.status(500).json({ erro: "Erro no servidor" });
      }

      if (!row) {
        return res.status(401).json({ erro: "Credenciais inválidas" });
      }

      res.json({
        id: row.id,
        nome: row.nome,
        email: row.email,
        role: row.role
      });
    }
  );
});

app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');

});