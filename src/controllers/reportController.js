const reportModel = require('../models/reportModel');

function home(req, res) {
  const q = req.query.q || '';
  const reports = q ? reportModel.searchReports(q) : reportModel.listLatest(10);
  res.render('pages/home', { title: 'ScammerVault', reports, q });
}

function create(req, res) {
  const payload = {
    reporterName: req.body.reporterName,
    contactType: req.body.contactType,
    contactValue: req.body.contactValue,
    category: req.body.category,
    amount: req.body.amount,
    incidentDate: req.body.incidentDate,
    description: req.body.description,
    createdBy: req.session.user?.id
  };
  if (!payload.contactType || !payload.contactValue || !payload.category || !payload.description) {
    req.flash('error', 'Isi data wajib: jenis kontak, identitas, kategori, deskripsi.');
    return res.redirect('/');
  }
  reportModel.createReport(payload);
  req.flash('success', 'Laporan berhasil direkam.');
  return res.redirect('/');
}

module.exports = { home, create };
