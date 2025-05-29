import express from 'express';
import { getConnection } from '../db.js';

const router = express.Router();

// POST /usuarios - Cadastra um novo usuário
router.post("/usuarios", (req, res) => {
  const { nome, email, senha } = req.body;

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

router.get("/usuarios", (req, res) => {
  let connection;
  try {
    connection = getConnection();

    if (!connection) {
      return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
    }

    const query = 'SELECT id, nome, email FROM usuarios';

    connection.execute(query, [], (err, results) => {
      if (err) {
        console.error('Erro ao buscar usuários:', err);
        return res.status(500).json({ mensagem: "Erro ao buscar usuários." });
      }

      return res.status(200).json(results);
    });

  } catch (erro) {
    console.error('Exceção ao buscar usuários:', erro);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
});

export default router;
