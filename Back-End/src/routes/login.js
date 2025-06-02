// src/routes/login.js
import express from 'express';
import { getConnection } from '../db.js';

const router = express.Router();

// Rota POST /login
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

// Função de login para testes (opcional)
export async function fazerLogin(email, senha) {
  const response = await fetch("http://192.168.1.10:3000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  const data = await response.json();
  return { status: data.sucesso, data };
}

export { router };
