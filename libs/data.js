(function(){
	var interf= {
			"todos":{
			},
			"users": {
			},
			"createUser": function(user, cb){
				this.users[user.username] = user.password;
				this.todos[user.username] = [];
				cb(null, user);
			},
			"getPrivateKey": function(publicKey, cb){
				cb(null, this.users[publicKey]);
			},
			"getTodos": function(publicKey, cb){
				cb(null, this.todos[publicKey]);
			},
			"addTodo": function(publicKey, todo, cb){
				todo._id = this.todos[publicKey].length;
				this.todos[publicKey].push(todo);
				cb(null, todo);

			},
			"updateTodo": function(publicKey, id, todo, cb){
				this.todos[publicKey][id] = todo;
				cb(null, todo);
			},
			"removeTodo": function(publicKey, id, cb){
				this.todos[publicKey].splice(id,1);
				cb(null, true);
			}
		};
	module.exports = {
		"load": function(configs, cb){
			cb(null, interf);
		}
	};
}());