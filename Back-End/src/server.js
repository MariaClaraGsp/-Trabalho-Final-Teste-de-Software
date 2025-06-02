import app from './app.js';
import { connectToDatabase, getConnection, closeDatabaseConnection } from './db.js';


const PORT = 3000;
const HOST = 'localhost';

connectToDatabase()
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Servidor rodando em http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Não foi possível iniciar o servidor:', err);
  });
