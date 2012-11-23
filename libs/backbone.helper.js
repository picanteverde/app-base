(function(){
	module.exports = {
		"sendApp": null,
		"setApp": function(path){
			this.sendApp = function(req, res, next){
				res.sendfile(path);
			};
		},
		"setRoutes": function(app, method, routes){
			var i = routes.length,
				setter = app[method];
			while(i--){
				setter.call(app, routes[i], this.sendApp);
			}
		}
	};
}());