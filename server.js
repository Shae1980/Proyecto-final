require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const port = process.env.port||3002;

app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'index',
  layoutsDir: path.join(__dirname, 'view/layouts'),
  partialsDir: path.join(__dirname, 'view/partials')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('js', express.static(path.join(__dirname, 'public/js')));

app.get('/', (req, res) => {
  res.render('layouts/index');
});

app.get('/register', (req, res) => {
  res.render('layouts/register');
});

app.get('/login', (req, res) => {
  res.render('layouts/login');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});