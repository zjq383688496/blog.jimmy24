var express = require('express');
var router  = express.Router();
var config  = require('../config');

router.get('/', (req, res, next) => {
	var user = req.session.user;
	res.render('index', {
		config: config,
		title: '首页',
		user: req.session.user
	});
});


module.exports = router;
