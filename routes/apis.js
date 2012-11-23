(function(){
	module.exports = function(app, authorize, dataStorage){
		app.post("/api/auth", [authorize], function(req, res, next){
			res.json({
				"auth": true,
				"username": req.body.username
			});
		});

		app.post("/api/register", function(req, res, next){
			if(req.body.username && req.body.password){
				dataStorage.createUser({
					username: req.body.username,
					password: req.body.password
				},
				function(err, created){
					if(err){
						res.json({
							"error": err
						});
					}else{
						res.json({
							"created": true,
							"user": created
						});
					}
				});
			}else{
				res.json({
					"error": "Username and Password required!"
				});
			}
		});
		
		app.get("/api/todos", [authorize] ,function(req, res, next){
			dataStorage.getTodos(req.query.publicKey, function(err, todos){
				if(err){
					res.json({"error":err});
				}
				res.json({"todos":todos});
			});
		});

		app.post("/api/todos", [authorize],function(req, res, next){
			var todo = {
				username: req.body.publicKey,
				task: req.body.task,
				priority: req.body.priority,
				done: req.body.done
			};
			dataStorage.addTodo(req.body.publicKey,todo,
				function(err, result){
					res.json(todo);
			});
		});
		app.put("/api/todos/:id",[authorize], function(req,res, next){
			var todo = {
				username: req.body.publicKey,
				task: req.body.task,
				priority: req.body.priority,
				done: req.body.done
			};
			dataStorage.updateTodo(req.body.publicKey, req.params.id, todo, function(err, result){
				res.json(result);
			});
		});
		app["delete"]("/api/todos/:id",[authorize], function(req, res, next){
			dataStorage.removeTodo(req.body.publicKey, req.params.id, function(err, result){
				res.json(result);
			});
		});
	};
}());