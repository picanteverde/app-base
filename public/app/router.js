define([
  // Application.
  "app",
  "modules/home",
  "modules/login",
  "modules/todos",
  "modules/register"
],

function(app, Home, Login, Todos, Register) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "login": "login",
      "todos": "todos",
      "register": "register"
    },
    index: function() {
      app.useLayout("main");
      app.layout.setView("#main-content", new Home()).render();
    },
    login: function(){
      app.useLayout("main");
      app.layout.setView('#main-content', new Login.Views.Form()).render();
    },
    todos: function(){
      app.useLayout("main");
      app.layout.setView('#main-content', new Todos()).render();
    },
    register: function(){
      app.useLayout("main");
      app.layout.setView('#main-content', new Register()).render();
    }
  });

  return Router;

});
