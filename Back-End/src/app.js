import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import rotas from './routes/index.js';

const app = express();

// Resolver __dirname para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminhos
const frontEndPath = path.join(__dirname, '..', '..', 'Front-End');
const pagesPath = path.join(frontEndPath, 'pages');
const stylesPath = path.join(frontEndPath, 'styles');
const assetsPath = path.join(frontEndPath, 'assets');
const scriptsPath = path.join(frontEndPath, 'scripts');  

// Middlewares
app.use(cors());
app.use(express.json());

// 🔥 Servindo arquivos estáticos
app.use('/styles', express.static(stylesPath));    // CSS
app.use('/assets', express.static(assetsPath));    // Imagens
app.use('/scripts', express.static(scriptsPath));  // ✅ JS de front-end
app.use(express.static(pagesPath));                // HTMLs

// Página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(pagesPath, 'index.html'));
});

// Teste rápido
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Rotas da API
app.use('/api', rotas);

export default app;
