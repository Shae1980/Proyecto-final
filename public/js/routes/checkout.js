// RUTAS PARA EL PROCESO DE PAGO DE MIS PEDIDOS (checkout.js)
// Acá manejo todo lo que pasa cuando el cliente va a pagar su compra y confirma su pedido

// Importo Express para usar el enrutador
const express = require('express');
const router = express.Router();

// Llamo a mi conexión de base de datos conexion.js
const conexion = require('../conexion');

// Ruta GET para mostrar la pantalla de checkout
router.get('/checkout', (req, res) => {
    // Verifico si el usuario NO tiene la cookie de sesión "user" activa
    if (!req.cookies || !req.cookies.user) {
        // Si no ha iniciado sesión, lo mando directo al login para que no compre anónimamente
        return res.redirect('/login');
    }
    // Si ya inició sesión, le dejo ver la página de checkout.hbs
    res.render('layouts/checkout');
});

// Ruta POST para recibir y guardar la compra del cliente en MySQL
router.post('/checkout', (req, res) => {
    // Por seguridad, vuelvo a revisar si el usuario tiene su sesión iniciada
    if (!req.cookies || !req.cookies.user) {
        return res.status(401).send('No autorizado. Debes iniciar sesión.');
    }

    // Saco todos los datos que el usuario escribió en el formulario de compra
    const { nombre_cliente, apellido, telefono, calle, sector, num_casa, metodo_pago, total, carrito } = req.body;

    // Consulta de MySQL para insertar los datos de la compra en mi tabla "venta"
    const query = `INSERT INTO venta (nombre_cliente, apellido, telefono, calle, sector, num_casa, metodo_pago, total) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    // Ejecuto la consulta para meter el pedido en la base de datos
    conexion.query(query, [nombre_cliente, apellido, telefono, calle, sector, num_casa, metodo_pago, total], (err, result) => {
        if (err) {
            console.error('Error al insertar venta en MySQL:', err);
            return res.status(500).send('Error al guardar el pedido en el servidor.');
        }

        console.log('Pedido guardado exitosamente para:', nombre_cliente, '| Total de la compra:', total, '| ID Venta:', result.insertId);
        
        const id_venta = result.insertId;

        // Parseo los productos del carrito
        let productosComprados = [];
        if (carrito) {
            if (typeof carrito === 'string') {
                try {
                    productosComprados = JSON.parse(carrito);
                } catch (e) {
                    console.error('Error al procesar los productos del carrito desde el JSON:', e);
                }
            } else if (Array.isArray(carrito)) {
                productosComprados = carrito;
            }
        }

        if (productosComprados.length > 0) {
            let completados = 0;
            let huboError = false;

            productosComprados.forEach(item => {
                // Buscamos el id_producto correspondiente por su nombre
                conexion.query('SELECT id_producto FROM producto WHERE nombre = ?', [item.nombre], (errProd, resultsProd) => {
                    if (errProd) {
                        console.error(`Error al buscar producto ${item.nombre}:`, errProd);
                        huboError = true;
                        completados++;
                        if (completados === productosComprados.length) {
                            res.status(500).send('Error al procesar el detalle de algunos productos.');
                        }
                    } else if (resultsProd.length === 0) {
                        console.error(`Producto no encontrado en la base de datos: ${item.nombre}`);
                        huboError = true;
                        completados++;
                        if (completados === productosComprados.length) {
                            res.status(400).send(`Producto no encontrado: ${item.nombre}`);
                        }
                    } else {
                        const id_producto = resultsProd[0].id_producto;
                        const precioItem = parseInt(item.precio.toString().replace(/[^0-9]/g, '')) || 0;

                        // Insertamos en det_venta usando las columnas correctas
                        const insertDetQuery = 'INSERT INTO det_venta (id_venta, id_producto, nombre_producto, cantidad, precio) VALUES (?, ?, ?, ?, ?)';
                        conexion.query(insertDetQuery, [id_venta, id_producto, item.nombre, item.cantidad, precioItem], (errDet) => {
                            completados++;
                            if (errDet) {
                                console.error(`Error al insertar en det_venta para producto ${item.nombre}:`, errDet);
                                huboError = true;
                            }

                            if (completados === productosComprados.length) {
                                if (huboError) {
                                    res.status(500).send('Pedido creado pero falló el registro de productos.');
                                } else {
                                    console.log('Detalle de venta registrado correctamente.');
                                    res.json({ success: true });
                                }
                            }
                        });
                    }
                });
            });
        } else {
            res.json({ success: true });
        }
    });
});

// Exporto mi enrutador para poder cargarlo en server.js
module.exports = router;