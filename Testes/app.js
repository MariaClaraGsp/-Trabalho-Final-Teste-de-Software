const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

// Coloque aqui o IP da máquina que roda o MySQL, ou 'localhost' se for o mesmo PC
const MYSQL_HOST = '192.168.1.10'; // Removi o espaço extra aqui

const connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: 'root',
  password: 'Amominhafamilia@123',
  database: 'usuarios',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.stack);
    return;
  }
  console.log('Conectado ao MySQL como id ' + connection.threadId);
});

// Rota para criar conta
app.post("/api/usuarios", (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
  }

  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  connection.execute(query, [nome, email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao salvar usuário:', err);
      return res.status(500).json({ mensagem: "Erro ao salvar o usuário." });
    }

    res.status(201).json({ mensagem: "Usuário salvo com sucesso!", id: results.insertId });
  });
});

// ✅ Rota de login com verificação no banco de dados
app.post("/api/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: "E-mail e senha são obrigatórios." });
  }

  const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  connection.execute(query, [email, senha], (err, results) => {
    if (err) {
      console.error("Erro no login:", err);
      return res.status(500).json({ mensagem: "Erro ao verificar login." });
    }

    if (results.length > 0) {
      res.status(200).json({ sucesso: true, mensagem: "Login bem-sucedido", usuario: results[0] });
    } else {
      res.status(401).json({ sucesso: false, mensagem: "E-mail ou senha inválidos." });
    }
  });
});
 

const PORT = 3000;
app.listen(PORT, '192.168.1.10', () => {
  console.log(`Servidor rodando em http://192.168.1.10:${PORT}`);
});
