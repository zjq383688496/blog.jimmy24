const mongodb = require('../config.db');

module.exports = {
	// 存储用户信息
	save: function(data, cb) {
		// 打开数据库
		mongodb.open(function(err, db) {
			if (err) return cb(err);
			// 读取 users 集合
			mongodb.collection('users', function (err, collection) {
				// 错误, 返回 err 信息
				if (err) {
					mongodb.close();
					return cb(err);
				}
				// 将用户数据插入 users 集合
				collection.insert(data, {
					safe: true
				}, function(err, user) {
					mongodb.close();
					if (err) return cb(err);
					// 成功, err 为 null, 并返回存储后的用户文档
					cb(null, user.ops[0]);
				});
			});
		});
	},
	// 读取用户信息
	get: function(name, cb) {
		// 打开数据库
		mongodb.open(function(err, db) {
			if (err) return cb(err);
			//读取 users 集合
			mongodb.collection('users', function (err, collection) {
				// 错误, 返回 err 信息
				if (err) {
					mongodb.close();
					return cb(err);
				}
				// 将用户数据插入 users 集合
				collection.findOne({
					name: name
				}, function(err, user) {
					mongodb.close();
					if (err) return cb(err);
					// 成功, err 为 null, 并返回存储后的用户文档
					cb(null, user);
				});
			});
		});
	}
};
