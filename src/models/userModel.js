const db = require('../config/db');

function createUser({ name, email, passwordHash }) {
  const stmt = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)');
  return stmt.run(name, email, passwordHash);
}

function findByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

function findById(id) {
  return db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?').get(id);
}

module.exports = { createUser, findByEmail, findById };
