const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

router.post("/login", (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ mensagem: "E-mail e senha são obrigatórios." });
  }

  const connection = getConnection();
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

module.exports = router;
