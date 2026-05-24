// CONEXIÓN A MI BASE DE DATOS DE MYSQL (db.js)
// Acá conecto mi proyecto con la base de datos de MySQL usando las variables de mi .env

// Importo el paquete de mysql2 que instalé con npm
const mysql = require('mysql2');

// Configuro los datos de mi conexión local o las del archivo .env
const connection = mysql.createConnection({
  host: process.env.db_host || 'localhost',
  user: process.env.db_user || 'root',
  password: process.env.db_password || '0019', // Mi contraseña de MySQL en mi computadora
  database: process.env.db_name || 'proyecto_final', // Nombre de la base de datos de mi proyecto
  port: process.env.db_port || 3306
});

// Hago la conexión y me aseguro de que funcione bien
connection.connect((err) => {
  if (err) {
    // Si da algún error, lo muestro por la consola
    console.error('Error al conectar a la base de datos MySQL:', err.message);
  } else {
    // Si funciona, me pone este mensaje para saber que ya está conectada
    console.log('Conexión exitosa a la base de datos MySQL.');
  }
});

// Exporto mi variable connection para poder hacer consultas en server.js
module.exports = connection;
