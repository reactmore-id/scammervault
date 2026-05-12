const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

function showLogin(req, res) { res.render('pages/login', { title: 'Login' }); }
function showRegister(req, res) { res.render('pages/register', { title: 'Daftar' }); }

async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    req.flash('error', 'Semua field wajib diisi.');
    return res.redirect('/register');
  }
  if (userModel.findByEmail(email)) {
    req.flash('error', 'Email sudah digunakan.');
    return res.redirect('/register');
  }
  const passwordHash = await bcrypt.hash(password, 10);
  userModel.createUser({ name, email, passwordHash });
  req.flash('success', 'Registrasi berhasil, silakan login.');
  return res.redirect('/login');
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = userModel.findByEmail(email);
  if (!user) {
    req.flash('error', 'Email atau password salah.');
    return res.redirect('/login');
  }
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    req.flash('error', 'Email atau password salah.');
    return res.redirect('/login');
  }
  req.session.user = { id: user.id, name: user.name, email: user.email };
  return res.redirect('/');
}

function logout(req, res) {
  req.session.destroy(() => res.redirect('/'));
}

module.exports = { showLogin, showRegister, register, login, logout };
