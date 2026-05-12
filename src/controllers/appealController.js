const appealModel = require('../models/appealModel');
const reportModel = require('../models/reportModel');

function showAppealForm(req, res) {
  const report = reportModel.findById(req.params.id);
  if (!report) {
    req.flash('error', 'Laporan tidak ditemukan.');
    return res.redirect('/');
  }
  return res.render('pages/appeal', { title: 'Banding', report });
}

function submitAppeal(req, res) {
  const report = reportModel.findById(req.params.id);
  if (!report) {
    req.flash('error', 'Laporan tidak ditemukan.');
    return res.redirect('/');
  }
  if (!req.body.reason) {
    req.flash('error', 'Alasan banding wajib diisi.');
    return res.redirect(`/reports/${report.id}/appeal`);
  }
  appealModel.createAppeal({ reportId: report.id, userId: req.session.user.id, reason: req.body.reason });
  req.flash('success', 'Banding berhasil diajukan, menunggu review admin komunitas.');
  return res.redirect('/');
}

module.exports = { showAppealForm, submitAppeal };
