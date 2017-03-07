// ==================================================
// ==== JM v0.0.1 ====
// 基于jQuery v2.2.1，包括以下方法集合：
// - JS原型方法扩展： String/Number/Array/Date
// - jQuery方法扩展: $.browser/$.fn
// - JM旧版保留方法: cookie
// ==================================================

(function($, global, document, undefined) {
	if (!$) return;
	if (!global.Jm) global.Jm = {};

	$.extend(String.prototype, {
		getQueryValue: function(name) {
			var str = /\?/.test(this)? this.split('?')[1]: this;
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = str.match(reg);
			if (r != null) return unescape(r[2]);
			return '';
		},
		// 简易模板
		substitute: function(data) {
			return data && typeof(data) == 'object'? this.replace(/\{([^{}]+)\}/g, function(match, key) {
				var key = key.split('.'),
					value = data,
					len = key.length;
				for (var i = 0; i < len; i++) {
					value = value[key[i]];
					if (!value) break;
				}
				return void 0 !== value ? '' + value : '';
			}): this.toString();
		}
	});

	global.Jm.cookie = {
		get: function(key) {
			var reg = new RegExp('(^|\\s)' + key + '=([^\\;]*)(\\;|$)', 'i');
			var r = global.document.cookie.match(reg);
			if (r != null) return unescape(r[2]);
			return '';
		},
		del: function(key) {
			document.cookie = key + '=; expires=Thu,01-Jan-70 00:00:01 GMT';
		},
		set: function(key, val, opts) {
			opts = typeof(opts) === 'object'? opts: { minute: opts };
			var alen = arguments.length;
			var path = alen > 3? arguments[3]: (opts.path || '/');
			var domain = (alen > 4) ? arguments[4] : (opts.domain || (opts.root ? document.domain : ''));
			var exptime = 0;
			if (opts.day) {
				exptime = 3600000 * 24 * opts.day;
			} else if (opts.hour) {
				exptime = 3600000 * opts.hour;
			}
			var exp = new Date(),
				expires = '';
			if (exptime > 0) {
				exp.setTime(exp.getTime() + exptime);
				expires = '; expires=' + exp.toGMTString();
			}
			domain = (domain) ? ('; domain=' + domain) : '';
			document.cookie = name + '=' + escape(value || '') + '; path=' + path + domain + expires;
		}
	};
	// page相关模块
	global.Jm.page = {
		dialog: {}
	};

	global.Jm.track = {
		// 统计初始化，默认加载baidu/google
		init: function(opts) {
			opts = opts || {
				baidu: false,
				google: false
			};
			if (opts.baidu) this.baidu.init();
			if (opts.google) this.google.init();
		},
		// 页面JS文件加载
		loadJS: function(url, isAsync) {
			if (isAsync) {
				MJJS.loader.getRemoteScript(url, { async:true, keepScriptTag:true });
			} else {
				document.write(unescape('%3Cscript type="text/javascript" src="'+ url +'"%3E%3C/script%3E')); 
			}
		},
		baidu: {
			// 百度uid key值
			uid: '8912c189b15a314abfe42da6db4e5b97',
			// 百度统计初始化, 异步加载时有问题不提交数据
			init: function() {
				Jm.track.loadJS('//hm.baidu.com/h.js%3F'+ this.uid);
			}
		},
		google: {
			uid: 'UA-50969958-1',
			domain: 'j24.com',
			// google统计初始化
			init: function() {
				var url = '/js/lib/googleana/analytics.js';
				(function(i, s, o, g, r, a, m) {
					i['GoogleAnalyticsObject'] = r;
					i[r] = i[r] || function() { (i[r].q = i[r].q || []).push(arguments); }, i[r].l = 1*new Date();
					a = s.createElement(o), m = s.getElementsByTagName(o)[0];
					a.async = 1;
					a.src = g;
					m.parentNode.insertBefore(a, m);
				})(global, document, 'script', url, 'ga');
				ga('create', this.uid, this.domain);
				ga('require', 'displayfeatures');
				ga('send', 'pageview');
			}
		}
		
	};
}(jQuery, this, document));