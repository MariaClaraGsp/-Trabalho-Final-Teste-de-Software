const mysql = require('mysql2');

let connection;

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
        resolve(connection);
      }
    });
  });
}

function getConnection() {
  return connection;
}

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

module.exports = { connectToDatabase, getConnection, closeDatabaseConnection };
