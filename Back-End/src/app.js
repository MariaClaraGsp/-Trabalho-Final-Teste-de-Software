const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const rotas = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

// Teste de rota
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

// Usando rotas da pasta routes
app.use("/api", rotas);

// Inicializar o servidor
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

module.exports = app;
