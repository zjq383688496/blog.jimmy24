const express = require('express');
const router  = express.Router();
const config  = require('../config');
const MJJS    = require('../common/MJJS');
const session = require('express-session');

router.all('*', (req, res, next) => {
	var token  = req.signedCookies.token,
		userId = req.signedCookies.userId,
		menu   = req.session.listMenu;
	if (token && userId && menu && menu.length) {
		next();
	} else {
		res.redirect(config.link.logout);
	}
});

module.exports = router;
