import express from 'express';
import { getConnection } from '../db.js';

const router = express.Router();

 // Cadastro de produto aqui OK
router.post('/', (req, res) => {
    const { nome, valor, descricao, categoria, estoque } = req.body;

  if (!nome || !valor || !descricao || !categoria || !estoque) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
  }

  let connection;
  try {
    connection = getConnection();
    if (!connection) {
      return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
    }

    const query = 'INSERT INTO produtos (nome, valor, descricao, categoria, estoque) VALUES (?, ?, ?, ?, ?)';
    
    connection.execute(query, [nome, valor, descricao, categoria, estoque], (err, results) => {
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
    console.error('Exceção ao salvar produto:', erro);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }

});

 //Listagem de todos os produtos OK
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

// Buscar produto por nome OK
router.get('/nome/:nome', (req, res) => {
  const connection = getConnection();
  if (!connection) {
    return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
  }

  const nome = req.params.nome;
  connection.query('SELECT * FROM produtos WHERE nome = ?', [nome], (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json(results);
  });
});

// Buscar produto por categoria OK
router.get('/categoria/:categoria', (req, res) => {
  const connection = getConnection();
  if (!connection) {
    return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
  }

  const categoria = req.params.categoria;
  connection.query('SELECT * FROM produtos WHERE categoria = ?', [categoria], (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      return res.status(500).json({ error: err.message });
    }

    res.status(200).json(results);
  });
});

//Atualizar um produto pelo id aqui OK
router.put('/:id', (req, res) => {

  const { id } = req.params;
  const { nome, valor, descricao, categoria, estoque } = req.body;

  const connection = getConnection();
  if (!connection) {
    return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
  }

  const atualizarProduto = ` UPDATE produtos SET nome = ?, valor = ?, descricao = ?, categoria = ?, estoque = ? WHERE id_produtos = ?`;

  connection.query( atualizarProduto, [nome, valor, descricao, categoria, estoque, id], (error, resultado) => {
      if (error) {
        console.error('Erro ao atualizar produto:', error);
        return res.status(500).json({ erro: 'Erro ao atualizar produto' });
      }

      if (resultado.affectedRows === 0) {
        return res.status(404).json({ mensagem: 'Produto não encontrado.' });
      }

      return res.status(200).json({ mensagem: 'Produto atualizado com sucesso.' });
    }
  );
});


 //lógica para deletar um produto pelo nome OK
router.delete('/:nome', (req, res) => {

    const { nome } = req.params;

    const connection = getConnection();
    if (!connection) {
      return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
    }

    const deletarProduto = 'DELETE FROM produtos WHERE nome = ?'

    connection.query(deletarProduto, [nome], (error, resultado) => {
        if(error){
            return res.json(error);
        }
        return res.status(200).json({ message: 'Produto deletado com sucesso', resultado})
    })
});

export default router;