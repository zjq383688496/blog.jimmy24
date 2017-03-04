const express = require('express');
const router  = express.Router();
const cache   = require('../routes.cache');
const config  = require('../config');

router.all('*', cache((req, res, next) => {
	res.status(404).render('ERROR404', {
		title: '对不起！您访问的页面丢失了！',
		config: config
	});
}));

module.exports = router;
