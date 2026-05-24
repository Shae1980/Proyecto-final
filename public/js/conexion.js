// CONEXIÓN DE RESPALDO A LA BASE DE DATOS (conexion.js)
// Este es el archivo viejo que usaba para conectarme a MySQL con mis datos escritos directo en el código

// Importo el paquete mysql2
const mysql = require('mysql2');

// Configuro los datos de mi conexión local
const conexion = mysql.createConnection({
    host: 'localhost',
    database: "proyecto_final", // Nombre de mi base de datos
    user: 'root',
    password: '0019' // Contraseña de mi MySQL local
});

// Hago la conexión de prueba
conexion.connect(function (err) {
    if (err) {
        // Si hay un error al conectar detengo la ejecución
        throw err;
    } else {
        // Si funciona pongo mi mensaje en la consola
        console.log('Conexión Exitosa :)');
    }
});

// Exporto la conexión para poder usarla en mis rutas
module.exports = conexion;