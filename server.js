var express = require('express'),
	http = require('http'),
	path = require('path'),
	authorize = require('./libs/RESTfulAuth'),
	bHelper = require('./libs/backbone.helper'),
	data = require('./libs/data'),
	apis = require('./routes/apis'), 
	app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 5000);

	app.use(express.favicon());
	app.use(express.logger('dev'));

	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.methodOverride());

	app.use(app.router);

	app.use(express['static'](path.join(__dirname, process.argv[2] || 'public')));

});

app.configure('development', function() {
    app.use(express.errorHandler({
        dumpException: true,
        showStack: true
    }));
});

bHelper.setApp("./public/index.html");
bHelper.setRoutes(app, "get", [
	"/login",
	"/register",
	"/todos"
	]);

data.load({},function(err,ds){
	authorize.setDataStore(ds);
	if(err){
		console.log("Error: " + err);
	}else{
		console.log("Database connection stablished!");
		apis(app, authorize.middleware, ds);
		http.createServer(app).listen(app.get('port'),function(){
			console.log("Express server listening on port " + app.get('port'));
		});
	}
});
