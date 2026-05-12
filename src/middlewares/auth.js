function injectUser(req, res, next) {
  res.locals.currentUser = req.session.user || null;
  res.locals.flash = req.flash();
  next();
}

function requireLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', 'Silakan login untuk mengajukan banding.');
    return res.redirect('/login');
  }
  return next();
}

module.exports = { injectUser, requireLogin };
