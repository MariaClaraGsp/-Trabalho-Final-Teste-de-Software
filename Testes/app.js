const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root',     
  password: 'Amominhafamilia@123',      
  database: 'usuarios',
  port:3306 
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.stack);
    return;
  }
  console.log('Conectado ao MySQL como id ' + connection.threadId);
});

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
