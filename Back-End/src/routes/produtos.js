import express from 'express';
import { getConnection } from '../db.js';

const router = express.Router();

 // Cadastro de produto aqui
router.post('/', (req, res) => {
    const { nome, valor, descricao, categoria } = req.body;

  // Verifica se todos os campos foram fornecidos
  if (!nome || !valor || !descricao || !categoria) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
  }

  let connection;
  try {
    connection = getConnection();

    if (!connection) {
      return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
    }

    const query = 'INSERT INTO produtos (nome, valor, descricao, categoria) VALUES (?, ?, ?, ?)';
    
    connection.execute(query, [nome, valor, descricao, categoria], (err, results) => {
      if (err) {
        console.error('Erro ao salvar usuário:', err);
        return res.status(500).json({ mensagem: "Erro ao salvar produto." });
      }

      if (!results || !results.insertId) {
        return res.status(500).json({ mensagem: "Falha ao obter ID do produto inserido." });
      }

      return res.status(201).json({
        mensagem: "produto salvo com sucesso!",
        id: results.insertId
      });
    });

  } catch (erro) {
    console.error('Exceção ao salvar usuário:', erro);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }

});

 //Listagem de todos os produtos aqui
router.get('/', (req, res) => {

  const connection = getConnection();

  if (!connection) {
    return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
  }

  connection.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json(results);
  });
  
});

//Buscar um produto pelo id aqui
router.get('/produtos/:id', (req, res) => {
  res.send(`Buscar produto com id ${req.params.id}`);
});

//Atualizar um produto pelo id aqui
router.put('/produtos/:id', (req, res) => {
  res.send(`Atualizar produto com id ${req.params.id}`);
});

 //lógica para deletar um produto pelo id aqui
router.delete('/produtos/:id', (req, res) => {
  res.send(`Deletar produto com id ${req.params.id}`);
});

export default router;