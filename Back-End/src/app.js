const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

let connection;

// Função para conectar ao banco de dados
function connectToDatabase() {
  return new Promise((resolve, reject) => {
    connection = mysql.createConnection({
      host: '192.168.1.10',
      user: 'root',
      password: 'Amominhafamilia@123',
      database: 'usuarios',
      port: 3306
    });

    connection.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao MySQL:', err.stack);
        reject(err);
      } else {
        console.log('Conectado ao MySQL como id ' + connection.threadId);
        // Armazena a conexão no app para uso em rotas, se quiser
        app.set('db', connection);
        resolve(connection);
      }
    });
  });
}

// Função para fechar conexão
function closeDatabaseConnection() {
  return new Promise((resolve, reject) => {
    if (!connection) {
      resolve();
      return;
    }
    connection.end((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// Rota /ping para o teste
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

// Rotas da API

app.post("/api/usuarios", (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
  }

  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  connection.execute(query, [nome, email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao salvar usuário:', err);
      return res.status(500).json({ mensagem: "Erro ao salvar o usuário." });
    }

    res.status(201).json({ mensagem: "Usuário salvo com sucesso!", id: results.insertId });
  });
});

app.post("/api/login", (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ mensagem: "E-mail e senha são obrigatórios." });
  }

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

// Inicializa o servidor somente se o arquivo for executado diretamente
if (require.main === module) {
  connectToDatabase()
    .then(() => {
      const PORT = 3000;
      app.listen(PORT, '192.168.1.10', () => {
        console.log(`Servidor rodando em http://192.168.1.10:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Não foi possível iniciar o servidor:', err);
    });
}

module.exports = { app, connectToDatabase, closeDatabaseConnection };
