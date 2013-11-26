/*global $*/
define(
  [
    'backbone','marionette','vent','text!pj',
    'views/Login', 'views/Home', 'views/main/Setup', 'models/Restaurant', 'views/Register',
    'views/GameDashboard', 'views/DBDashboard', 'views/main/Users', 'views/nav/Navbar'
  ],
  function (
    Backbone, Marionette, vent, pj, Login, Home, Setup, Restaurant, Register, GameDashboard, DBDashboard, Users, Navbar
  ) {
    'use strict';

    pj = JSON.parse(pj);

    var user,
        router,
        hash,
        model;
    var app = new Marionette.Application();
  
    app.addRegions({
      navbar: '#navbar',
      main: '#main'
    });

    app.addInitializer(function(){
      $( document ).ajaxStart( function() {
        $('#ajax-spinner').css( {top: '50%', left: '50%', margin: '-' + ( $('#ajax-spinner').height() / 2 ) + 'px 0 0 -' + ( $('#ajax-spinner').width() / 2 ) + 'px' } );
        $('#ajax-spinner').show();
      }).ajaxStop( function() {
        $('#ajax-spinner').hide();
      }).ajaxError( function(jqxhr, status, error) {        
        $('#ajax-spinner').hide();
      });

      $(document).on('click', 'a[href="#"]', function(e) {
        e.preventDefault();
      });

      hash = window.location.hash;
      $.ajax({
        error: function(jqxhr, status, error) {
          app.main.show(new Login());
        },
        success: function(data, status, jqxhr) {
          user = _.clone(data, true);
          router = new (Backbone.Marionette.AppRouter.extend({
            "routes": {
              "home": function() {
                app.main.show(new Home());
              },
              "setup": function() {
                model = new Restaurant();
                app.main.show(new Setup({model: model}));
              },
              "users": function() {
                app.main.show(new Users());
              },
              "users/:id": function(id) {
                // TODO
              },
              "dashboard": function() {
                app.main.show(new GameDashboard());
              },
              "teradata": function() {
                app.main.show(new DBDashboard());
              }
            }
          }))();

          app.navbar.show(new Navbar({model: new Backbone.Model({title: pj.title})}));
          router.navigate(hash || '#/home', { 'trigger': true });
        },
        type: 'POST',
        url: 'api/check'
      });
    });

    app.on('initialize:after', function(options) {
      Backbone.history.start();
    });

    vent.on('login:failure', function(error) {
      // TODO
    });

    return app;
  }
);
