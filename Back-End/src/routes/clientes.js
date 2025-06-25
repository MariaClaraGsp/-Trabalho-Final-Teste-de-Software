import express from 'express';
import { getConnection } from '../db.js';

const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params; // Pega o ID da URL

  let connection;
  try {
    connection = getConnection();

    if (!connection) {
      return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
    }

    const query = 'SELECT id, nome, cpf, email FROM clientes WHERE id = ?';

    connection.execute(query, [id], (err, results) => {
      if (err) {
        console.error('Erro ao buscar cliente por ID:', err);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
      }

      if (results.length === 0) {
        return res.status(404).json({ mensagem: "Cliente não encontrado." });
      }

      return res.status(200).json(results[0]); // Retorna o primeiro (e único) resultado
    });

  } catch (erro) {
    console.error('Exceção ao buscar cliente por ID:', erro);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
});


router.put('/:id', (req, res) => { // PARÂMETRO DA ROTA MUDOU DE ':cpf' PARA ':id'
  const { id } = req.params; // Pega o ID da URL
  const { nome, email, cpf } = req.body; // Campos para atualizar

  if (!nome && !email && !cpf) { // Adicionei validação para não permitir body vazio
      return res.status(400).json({ mensagem: "Nenhum dado para atualizar fornecido." });
  }

  let connection;
  try {
    connection = getConnection();
    if (!connection) {
      return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
    }

    const atualizarCliente = `UPDATE clientes SET nome = ?, email = ?, cpf = ? WHERE id = ?`; // Query usa ID
    // A ordem dos parâmetros no array deve corresponder à ordem dos '?' na query
    connection.execute(atualizarCliente, [nome, email, cpf, id], (error, resultado) => {
      if (error) {
        console.error('Erro ao atualizar cliente:', error);
        // Pode ser um erro de email/CPF duplicado, se houver UNIQUE constraint
        if (error.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ mensagem: "Email ou CPF já cadastrado com outro cliente." });
        }
        return res.status(500).json({ erro: 'Erro ao atualizar cliente' });
      }

      if (resultado.affectedRows === 0) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado para atualização.' });
      }

      return res.status(200).json({ mensagem: 'Cliente atualizado com sucesso.' });
    });
  } catch (erro) {
    console.error('Exceção ao atualizar cliente:', erro);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
});


// DELETE /clientes/:id - Deleta cliente por ID (CORRIGIDA PARA ID)
router.delete('/:id', (req, res) => { // PARÂMETRO DA ROTA MUDOU DE ':cpf' PARA ':id'
  const { id } = req.params; // Pega o ID da URL

  let connection;
  try {
    connection = getConnection();
    if (!connection) {
      return res.status(500).json({ mensagem: "Erro ao conectar ao banco de dados." });
    }

    const deletarClienteQuery = 'DELETE FROM clientes WHERE id = ?'; // Query usa ID

    connection.execute(deletarClienteQuery, [id], (error, resultado) => { // Usando execute
      if (error) {
        console.error('Erro ao excluir cliente:', error);
        return res.status(500).json({ mensagem: "Erro ao excluir cliente." });
      }
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado para exclusão.' });
      }
      return res.status(200).json({ message: 'Cliente deletado com sucesso', resultado });
    });
  } catch (erro) {
    console.error('Exceção ao excluir cliente:', erro);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
});

export default router;