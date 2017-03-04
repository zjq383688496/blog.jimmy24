(function(MJJS, window) {
	MJJS.server.api = '/api';
	MJJS.define('MJJS.common', {
		
	});
	MJJS.define('MJJS.http', {
		ajax: function(type, url, data, success, error) {
			var _data, _success, _error;
			if (typeof(data)==='function') {
				_data    = {};
				_success = data;
				_error   = success;
			} else {
				_data    = data;
				_success = success;
				_error   = error;
			}
			$.ajax({
				url: MJJS.server.api + (url || ''),
				data: _data,
				type: type,
				success: function(d) {
					if (d.code === '0000') {
						if (typeof(_success)==='function') _success(d.data);
					} else {
						MJJS.page.dialog.alert(d.msg, function() {
							window.location.href = '/logout';
						});
					}
				},
				error: function(err) {
					if (typeof(_error)==='function') _error(err);
				}
			});
		},
		get: function(url, data, success, error) {
			this.ajax('get', url, data, success, error);
		},
		post: function(url, data, success, error) {
			this.ajax('post', url, data, success, error);
		}
	});
	MJJS.define('MJJS.header', {
	});
})(MJJS, window);