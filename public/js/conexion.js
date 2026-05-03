let mysql = require('mysql2');

let conexion= mysql.createConnection({
    host:'localhost',
    database:"proyecto_final",
    user:'root',
    password:'0019'
});

conexion.connect(function (err){
    if(err){
        throw err;
    }else{
        console.log('Conexion Exitosa :)');
    }
});

module.exports=conexion