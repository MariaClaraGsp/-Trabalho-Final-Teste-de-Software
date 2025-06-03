import mysql from 'mysql2';

let connection;

export function connectToDatabase() {
  return new Promise((resolve, reject) => {
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Amominhafamilia@123',
      database: 'pata_soft',
      port: 3306
    });

    connection.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao MySQL:', err.stack);
        reject(err);
      } else {
        console.log('Conectado ao MySQL como id ' + connection.threadId);
        resolve(connection);
      }
    });
  });
}

export function getConnection() {
  return connection;
}

export function closeDatabaseConnection() {
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