import app from './app.js';
import { connectToDatabase, getConnection, closeDatabaseConnection } from './db.js';


const PORT = 3000;
const HOST = '192.168.1.10';

connectToDatabase()
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Servidor rodando em http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Não foi possível iniciar o servidor:', err);
  });
