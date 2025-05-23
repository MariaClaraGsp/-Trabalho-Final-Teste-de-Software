import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db.js';
import rotas from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

// Teste de rota
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

// Usando rotas da pasta routes
app.use('/api', rotas);

export default app;
