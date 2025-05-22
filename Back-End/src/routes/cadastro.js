const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

router.post("/usuarios", (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
  }

  const connection = getConnection();
  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  connection.execute(query, [nome, email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao salvar usuário:', err);
      return res.status(500).json({ mensagem: "Erro ao salvar o usuário." });
    }

    res.status(201).json({ mensagem: "Usuário salvo com sucesso!", id: results.insertId });
  });
});

module.exports = router;
