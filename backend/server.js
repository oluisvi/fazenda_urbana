const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

// =====================================
// 🔥 SERVIR FRONTEND
// =====================================

console.log("Diretório atual:", __dirname);

const frontendPath = path.join(__dirname, "..", "frontend");

app.use(express.static(frontendPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


// =====================================
// 💾 BANCO SQLITE (SUPORTE RENDER)
// =====================================

let dbPath = "./database.db";

// se existir disco persistente no Render
if (fs.existsSync("/data")) {
  dbPath = "/data/database.db";
}

const db = new sqlite3.Database(dbPath);


// =====================================
// 📦 CRIAÇÃO DAS TABELAS
// =====================================

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
    CREATE TABLE IF NOT EXISTS producao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT,
      cultura TEXT,
      quantidade INTEGER,
      observacao TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS fornecedores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cnpj TEXT,
      telefone TEXT,
      email TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf TEXT,
      telefone TEXT,
      email TEXT
    )
  `);

  // Admin padrão
  db.get("SELECT * FROM usuarios WHERE email = ?", ["admin@admin.com"], (err, row) => {
    if (!row) {
      db.run(`
        INSERT INTO usuarios (nome, email, senha, role)
        VALUES (?, ?, ?, ?)
      `, ["Administrador", "admin@admin.com", "1234", "admin"]);
      console.log("Admin padrão criado 🚀");
    }
  });

  // User padrão
  db.get("SELECT * FROM usuarios WHERE email = ?", ["user@user.com"], (err, row) => {
    if (!row) {
      db.run(`
        INSERT INTO usuarios (nome, email, senha, role)
        VALUES (?, ?, ?, ?)
      `, ["Usuário", "user@user.com", "1234", "user"]);
      console.log("Usuário padrão criado 🚀");
    }
  });

});


// =====================================
// 🔐 LOGIN
// =====================================

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.get(
    "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
    [email, senha],
    (err, row) => {
      if (err) return res.status(500).json({ erro: "Erro no servidor" });
      if (!row) return res.status(401).json({ erro: "Credenciais inválidas" });

      res.json(row);
    }
  );
});


// =====================================
// 📊 DASHBOARD
// =====================================

app.get("/dashboard", (req, res) => {

  db.all("SELECT COUNT(*) as total FROM producao", [], (err, totalRows) => {
    if (err) return res.status(500).json(err);

    db.all("SELECT SUM(quantidade) as totalKg FROM producao", [], (err, kgRows) => {
      if (err) return res.status(500).json(err);

      db.all(`
        SELECT cultura, SUM(quantidade) as total
        FROM producao
        GROUP BY cultura
      `, [], (err, porProduto) => {

        if (err) return res.status(500).json(err);

        res.json({
          totalProducoes: totalRows[0].total || 0,
          totalKg: kgRows[0].totalKg || 0,
          porProduto: porProduto
        });

      });
    });
  });

});


// =====================================
// 🌾 PRODUÇÃO
// =====================================

app.get("/producao", (req, res) => {
  db.all("SELECT * FROM producao ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.get("/producao/:id", (req, res) => {
  db.get(
    "SELECT * FROM producao WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json(err);
      res.json(row);
    }
  );
});

app.post("/producao", (req, res) => {
  const { data, cultura, quantidade, observacao } = req.body;

  db.run(
    "INSERT INTO producao (data, cultura, quantidade, observacao) VALUES (?, ?, ?, ?)",
    [data, cultura, quantidade, observacao],
    function(err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

app.put("/producao/:id", (req, res) => {
  const { data, cultura, quantidade, observacao } = req.body;

  db.run(
    "UPDATE producao SET data=?, cultura=?, quantidade=?, observacao=? WHERE id=?",
    [data, cultura, quantidade, observacao, req.params.id],
    function(err) {
      if (err) return res.status(500).json(err);
      res.json({ atualizado: this.changes });
    }
  );
});

app.delete("/producao/:id", (req, res) => {
  db.run("DELETE FROM producao WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ deletado: this.changes });
  });
});


// =====================================
// 🏭 FORNECEDORES
// =====================================

app.get("/fornecedores", (req, res) => {
  db.all("SELECT * FROM fornecedores ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.get("/fornecedores/:id", (req, res) => {
  db.get(
    "SELECT * FROM fornecedores WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json(err);
      res.json(row);
    }
  );
});

app.post("/fornecedores", (req, res) => {
  const { nome, cnpj, telefone, email } = req.body;

  db.run(
    "INSERT INTO fornecedores (nome, cnpj, telefone, email) VALUES (?, ?, ?, ?)",
    [nome, cnpj, telefone, email],
    function(err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

app.put("/fornecedores/:id", (req, res) => {
  const { nome, cnpj, telefone, email } = req.body;

  db.run(
    "UPDATE fornecedores SET nome=?, cnpj=?, telefone=?, email=? WHERE id=?",
    [nome, cnpj, telefone, email, req.params.id],
    function(err) {
      if (err) return res.status(500).json(err);
      res.json({ atualizado: this.changes });
    }
  );
});

app.delete("/fornecedores/:id", (req, res) => {
  db.run("DELETE FROM fornecedores WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ deletado: this.changes });
  });
});


// =====================================
// 👥 CLIENTES
// =====================================

app.get("/clientes", (req, res) => {
  db.all("SELECT * FROM clientes ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.get("/clientes/:id", (req, res) => {
  db.get(
    "SELECT * FROM clientes WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json(err);
      res.json(row);
    }
  );
});

app.post("/clientes", (req, res) => {
  const { nome, cpf, telefone, email } = req.body;

  db.run(
    "INSERT INTO clientes (nome, cpf, telefone, email) VALUES (?, ?, ?, ?)",
    [nome, cpf, telefone, email],
    function(err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

app.put("/clientes/:id", (req, res) => {
  const { nome, cpf, telefone, email } = req.body;

  db.run(
    "UPDATE clientes SET nome=?, cpf=?, telefone=?, email=? WHERE id=?",
    [nome, cpf, telefone, email, req.params.id],
    function(err) {
      if (err) return res.status(500).json(err);
      res.json({ atualizado: this.changes });
    }
  );
});

app.delete("/clientes/:id", (req, res) => {
  db.run("DELETE FROM clientes WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ deletado: this.changes });
  });
});


// =====================================
// 🚀 START SERVIDOR
// =====================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor rodando na porta " + PORT);
});
