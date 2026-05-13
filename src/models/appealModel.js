const db = require('../config/db');

function createAppeal({ reportId, userId, reason }) {
  return db.prepare('INSERT INTO appeals (report_id, user_id, reason) VALUES (?, ?, ?)').run(reportId, userId, reason);
}

module.exports = { createAppeal };
