const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const routes = require('./routes');
const { injectUser } = require('./middlewares/auth');
require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'scammervault-secret',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(injectUser);

app.use(routes);

app.listen(PORT, () => {
  console.log(`ScammerVault running on http://localhost:${PORT}`);
});
