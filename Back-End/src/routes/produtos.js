import express from 'express';
import { getConnection } from '../db.js';

const router = express.Router();

 // Cadastro de produto aqui
router.post('/', (req, res) => {
    const { nome, valor, descricao, categoria } = req.body;

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
    console.error('Exceção ao salvar produto:', erro);
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
router.put('/:nome', (req, res) => {

  const { nome } = req.params;
  const { valor, descricao, categoria } = req.body;

  const connection = getConnection();
  if (!connection) {
    return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
  }

  const atualizarProduto = ` UPDATE produtos SET valor = ?, descricao = ?, categoria = ? WHERE nome = ?`;

  connection.query( atualizarProduto, [valor, descricao, categoria, nome], (error, resultado) => {
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


 //lógica para deletar um produto pelo nome aqui
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