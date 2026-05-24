// ARCHIVO PRINCIPAL DE MI SERVIDOR (server.js)
// Acá configuro todo mi servidor, las rutas de inicio, el login, registro y la conexión a las vistas

// Cargo las variables de mi archivo .env para las contraseñas
require('dotenv').config();

// Llamo a los paquetes que necesito para que mi proyecto funcione
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

// Traigo la conexión de la base de datos de mi archivo db.js
const db = require('./db');

// Traigo la librería bcryptjs para poder encriptar las contraseñas de mis usuarios
const bcrypt = require('bcryptjs');

// Inicializo mi aplicación Express
const app = express();

// Pongo el puerto 3002 por defecto para abrir mi página
const port = process.env.port || 3002;

// --- CONFIGURO HANDLEBARS PARA MIS VISTAS (.hbs) ---
app.engine('hbs', exphbs.engine({
  extname: 'hbs', // Le digo que mis archivos terminan en .hbs
  defaultLayout: false, // Desactivo el diseño por defecto para hacer los míos propios
  layoutsDir: path.join(__dirname, 'view/layouts'), // Dónde guardo mis páginas principales
  partialsDir: path.join(__dirname, 'view/partials') // Dónde guardo mis partes repetidas como el navbar o footer
}));

// Le digo a Express que use Handlebars para mostrar las pantallas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));

// --- PONGO PÚBLICAS MIS CARPETAS DE ESTILOS Y SCRIPTS ---
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// --- CONFIGURACIÓN PARA FORMULARIOS Y COOKIES ---

// Esto sirve para poder leer los datos que me envían en los formularios de las páginas
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Esta función sirve para leer las cookies del navegador de forma manual
app.use((req, res, next) => {
  req.cookies = {}; // Creo un objeto vacío
  const cookieHeader = req.headers.cookie; // Saco el texto de las cookies
  if (cookieHeader) {
    // Separo las cookies por ';' y las guardo como clave y valor
    cookieHeader.split(';').forEach(cookie => {
      const parts = cookie.split('=');
      const name = parts[0].trim(); // Nombre de la cookie
      const value = parts.slice(1).join('=').trim(); // Valor de la cookie
      req.cookies[name] = value;
    });
  }
  next(); // Sigo con la siguiente función
});

// Acá paso los datos del usuario que inició sesión a mis plantillas Handlebars (para mostrar su nombre en el navbar)
app.use((req, res, next) => {
  if (req.cookies.user) {
    try {
      // Si existe la cookie de usuario, la convierto de texto JSON a un objeto de JavaScript
      res.locals.user = JSON.parse(decodeURIComponent(req.cookies.user));
    } catch (e) {
      res.locals.user = null; // Si da error, lo dejo vacío
    }
  } else {
    res.locals.user = null; // Si no hay cookie, no hay usuario activo
  }
  next();
});

// --- MIS RUTAS PRINCIPALES Y VISTAS ---

// Ruta para cargar la página de inicio (Landing Page)
app.get('/', (req, res) => {
  res.render('layouts/index'); // Muestro index.hbs
});

// Ruta para cargar la pantalla de registro de usuarios
app.get('/register', (req, res) => {
  res.render('layouts/register'); // Muestro register.hbs
});

// Acá recibo los datos que me mandan en el formulario de registro y los meto en mi base de datos
app.post('/register', (req, res) => {
  const { nombre, email, password } = req.body;

  // Verifico que el usuario haya llenado todos los campos del formulario
  if (!nombre || !email || !password) {
    return res.status(400).send('Todos los campos son obligatorios.');
  }

  // ENCRIPTACIÓN: Encripto la contraseña con bcrypt para que no se guarde en texto plano en la base de datos
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Inserto el nuevo usuario en mi tabla "register" con su contraseña ya encriptada
  const queryRegister = 'INSERT INTO register (nombre, email, password) VALUES (?, ?, ?)';
  db.query(queryRegister, [nombre, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error al insertar en la tabla register:', err);
      return res.status(500).send('Error interno del servidor al registrar el usuario.');
    }

    // También lo meto en mi tabla "login" para que pueda iniciar sesión después
    const queryLogin = 'INSERT INTO login (nombre, email, password) VALUES (?, ?, ?)';
    db.query(queryLogin, [nombre, email, hashedPassword], (err2) => {
      if (err2) {
        console.error('Error al insertar en la tabla login:', err2);
      }

      console.log('Usuario registrado con éxito en register y login con contraseña encriptada:', { nombre, email });

      // Le inicio sesión automáticamente guardando su nombre y correo en una cookie por 15 minutos
      const userData = { nombre, email };
      res.cookie('user', JSON.stringify(userData), { maxAge: 900000, httpOnly: false });

      // Lo mando de una vez a la página de inicio ya logueado
      res.redirect('/');
    });
  });
});

// Ruta para cargar la pantalla de inicio de sesión (Login)
app.get('/login', (req, res) => {
  res.render('layouts/login'); // Muestro login.hbs
});

// Acá valido si los datos que escribió el usuario en el login son correctos
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Verifico que haya escrito el correo y la clave
  if (!email || !password) {
    return res.status(400).send('El correo y la contraseña son requeridos.');
  }

  // Busco al usuario en mi tabla "login" usando solamente su correo
  const query = 'SELECT * FROM login WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error al consultar la tabla login:', err);
      return res.status(500).send('Error en el servidor.');
    }

    // Si la base de datos no me devuelve nada es porque ese correo no existe
    if (results.length === 0) {
      return res.status(401).send('Correo o contraseña incorrectos.');
    }

    // Saco los datos del usuario que encontramos en la tabla
    const user = results[0];

    // COMPARACIÓN: Verifico si la clave que escribió coincide con la encriptada en mi base de datos
    const passwordMatches = bcrypt.compareSync(password, user.password);

    // Si la clave no coincide, le digo que sus datos están mal
    if (!passwordMatches) {
      return res.status(401).send('Correo o contraseña incorrectos.');
    }

    // Si todo está bien, guardo su nombre y correo para su sesión
    const userData = { nombre: user.nombre, email: user.email };

    // Le creo la cookie de sesión para mantenerlo logueado por 15 minutos
    res.cookie('user', JSON.stringify(userData), { maxAge: 900000, httpOnly: false });

    console.log('Usuario logueado con éxito con contraseña encriptada:', userData);

    // Lo mando a la página de inicio ya con la sesión iniciada
    res.redirect('/');
  });
});

// Ruta para cerrar sesión (Logout), borra la cookie de sesión y nos manda al inicio
app.get('/logout', (req, res) => {
  res.clearCookie('user'); // Borro la cookie del navegador
  res.redirect('/'); // Lo mando a la página de inicio
});

// Ruta para cargar el catálogo de productos
app.get('/catalogo', (req, res) => {
  res.render('layouts/catalogo'); // Muestro catalogo.hbs
});

// --- RUTAS PARA FINALIZAR LA COMPRA (CHECKOUT) ---
// Importo mis rutas para finalizar pedidos desde mi archivo checkout.js
const checkout = require('./public/js/routes/checkout');
app.use('/', checkout);

// Pongo a escuchar mi servidor en el puerto configurado
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});