const db = require('../config/db');

function createReport(payload) {
  const stmt = db.prepare(`
    INSERT INTO reports
    (reporter_name, contact_type, contact_value, category, amount, incident_date, description, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(
    payload.reporterName || null,
    payload.contactType,
    payload.contactValue,
    payload.category,
    payload.amount || null,
    payload.incidentDate || null,
    payload.description,
    payload.createdBy || null
  );
}

function listLatest(limit = 10) {
  return db.prepare('SELECT * FROM reports ORDER BY created_at DESC LIMIT ?').all(limit);
}

function searchReports(keyword) {
  const like = `%${keyword}%`;
  return db.prepare(`
    SELECT * FROM reports
    WHERE contact_value LIKE ? OR description LIKE ? OR category LIKE ?
    ORDER BY created_at DESC
  `).all(like, like, like);
}

function findById(id) {
  return db.prepare('SELECT * FROM reports WHERE id = ?').get(id);
}

module.exports = { createReport, listLatest, searchReports, findById };
