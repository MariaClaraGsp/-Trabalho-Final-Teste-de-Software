import express from 'express';
import { getConnection } from '../db.js';

const router = express.Router();

// POST /usuarios - Cadastra um novo usuário
router.post("/usuarios", (req, res) => {
  const { nome, email, senha } = req.body;

  // Verifica se todos os campos foram fornecidos
  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
  }

  let connection;
  try {
    connection = getConnection();

    if (!connection) {
      return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
    }

    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    
    connection.execute(query, [nome, email, senha], (err, results) => {
      if (err) {
        console.error('Erro ao salvar usuário:', err);
        return res.status(500).json({ mensagem: "Erro ao salvar o usuário." });
      }

      if (!results || !results.insertId) {
        return res.status(500).json({ mensagem: "Falha ao obter ID do usuário inserido." });
      }

      return res.status(201).json({
        mensagem: "Usuário salvo com sucesso!",
        id: results.insertId
      });
    });

  } catch (erro) {
    console.error('Exceção ao salvar usuário:', erro);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
});

export default router;
