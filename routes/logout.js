const express = require('express');
const router  = express.Router();
const config  = require('../config');
const MJJS    = require('../common/MJJS');

router.get('/', (req, res, next) => {
	req.session.user = null;
	res.redirect('/');	// 登出成功后跳转到主页
});

module.exports = router;
