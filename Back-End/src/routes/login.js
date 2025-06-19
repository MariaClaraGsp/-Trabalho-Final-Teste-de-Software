// src/routes/loginRoutes.js
import express from 'express';
import { getConnection } from '../db.js';

const router = express.Router();

// Rota POST /api/login
router.post("/", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ sucesso: false, mensagem: "E-mail e senha são obrigatórios." });
  }

  const connection = getConnection();
  const query = 'SELECT * FROM clientes WHERE email = ? AND senha = ?';

  connection.execute(query, [email, senha], (err, results) => {
    if (err) {
      console.error("Erro no login:", err);
      return res.status(500).json({ sucesso: false, mensagem: "Erro ao verificar login." });
    }

    if (results.length > 0) {
      res.status(200).json({
        sucesso: true,
        mensagem: "Login bem-sucedido",
        usuario: results[0]
      });
    } else {
      res.status(401).json({ sucesso: false, mensagem: "E-mail ou senha inválidos." });
    }
  });
});

export default router;
