import express from 'express';
import { getConnection } from '../db.js';

const router = express.Router();

// POST /usuarios - Cadastra um novo usuário OK
router.post("/", (req, res) => {
  const { nome, cpf, email, senha } = req.body;

  if (!nome || !cpf || !email || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
  }

  let connection;
  try {
    connection = getConnection();

    if (!connection) {
      return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
    }

    const query = 'INSERT INTO clientes (nome, cpf, email, senha) VALUES (?, ?, ?, ?)';
    
    connection.execute(query, [nome, cpf, email, senha], (err, results) => {
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

//Buscar clientes OK
router.get("/", (req, res) => {
  let connection;
  try {
    connection = getConnection();

    if (!connection) {
      return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
    }

    const query = 'SELECT nome, cpf, email FROM clientes';

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

//Alterar dados do cliente OK
router.put('/:cpf', (req, res) => {

  const { cpf } = req.params;
  const { nome, email, senha } = req.body;

  const connection = getConnection();
  if (!connection) {
    return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
  }

  const atualizarCliente = ` UPDATE clientes SET nome = ?, email = ?, senha = ? WHERE cpf = ?`;

  connection.query( atualizarCliente, [nome, email, senha, cpf], (error, resultado) => {
      if (error) {
        console.error('Erro ao atualizar cliente:', error);
        return res.status(500).json({ erro: 'Erro ao atualizar cliente' });
      }

      if (resultado.affectedRows === 0) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
      }

      return res.status(200).json({ mensagem: 'Cliente atualizado com sucesso.' });
    }
  );
});

//Deletar cliente OK
router.delete('/:cpf', (req, res) => {

    const { cpf } = req.params;

    const connection = getConnection();
    if (!connection) {
      return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
    }

    const deletarProduto = 'DELETE FROM clientes WHERE cpf = ?'

    connection.query(deletarProduto, [cpf], (error, resultado) => {
        if(error){
            return res.json(error);
        }
        return res.status(200).json({ message: 'Cliente deletado com sucesso', resultado})
    })
});

export default router;
