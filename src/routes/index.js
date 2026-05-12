const express = require('express');
const authController = require('../controllers/authController');
const reportController = require('../controllers/reportController');
const appealController = require('../controllers/appealController');
const { requireLogin } = require('../middlewares/auth');

const router = express.Router();

router.get('/', reportController.home);
router.post('/reports', reportController.create);

router.get('/register', authController.showRegister);
router.post('/register', authController.register);
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/reports/:id/appeal', requireLogin, appealController.showAppealForm);
router.post('/reports/:id/appeal', requireLogin, appealController.submitAppeal);

module.exports = router;
