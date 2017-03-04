const env      = process.env.NODE_ENV || 'localhost';
const cookieExpiredTime = 60000 * 30;
const cacheExpiredTime  = 86400 * 30;
const config = {
	// 本地环境
	localhost: {
		api: 'http://115.159.219.170:8081',
		static: '/public',
		views: 'views',
		link: {
			index:  'http://localhost:4100',
			logout: 'http://localhost:4100/logout'
		}
	},
	// DEV环境
	development: {
		api: 'http://115.159.219.170:8081',
		static: '/public/build',
		views: 'views/build',
		link: {
			index:  'https://mjcrm-dev.weimob.com',
			logout: 'https://mjcrm-dev.weimob.com/logout'
		},
		cacheExpiredTime: cacheExpiredTime
	}
};

const currentConfig = config[env];
module.exports = currentConfig;
module.exports.cookieSecret = 'blog.jimmy24.com';
module.exports.db = {
	db: 'blog',
	host: 'localhost',
	port: 27017
}
module.exports.env = env;
module.exports.debug = (env == 'development');
module.exports.noLocal = (env != 'localhost');

// cookie过期时间 30分钟
module.exports.cookieExpiredTime = cookieExpiredTime;
// cookie签名
module.exports.cookieCtrl = {
	httpOnly: true,
	signed: true,
	maxAge: cookieExpiredTime
};
module.exports.title = '24小时';