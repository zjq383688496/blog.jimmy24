var ERROR404 = require('./routes/ERROR404');
var ERROR500 = require('./routes/ERROR500');

var COOKIE   = require('./routes/cookie');		// 监控用户登录状态
var LOGOUT   = require('./routes/logout');		// 登出
var LOGIN    = require('./routes/login');		// 登录
var REG      = require('./routes/register');	// 注册

var INDEX    = require('./routes/index');		// 主页
var API      = require('./routes/api');

module.exports = function(app) {
	// 登录|登出
	app.use('/register', REG);
	app.use('/login',    LOGIN);
	app.use('/logout',   LOGOUT);
	
	// 判断用户登录状态
	// app.use([
	// 	'/'
	// ], COOKIE);

	// 主页面
	app.use('/', INDEX);

	// API
	app.use('/api', API);

	// 404 catch-all 处理器 & 500 错误处理器
	app.use(ERROR404);
	app.use(ERROR500);
};
