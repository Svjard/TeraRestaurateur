/*global $*/
define(
  [
    'backbone','marionette','router','controller','vent','text!pj',
    'views/Login', 'views/Home', 'views/home/Setup', 'models/Restaurant', 'views/Register',
    'views/GameDashboard', 'views/DBDashboard'
  ],
  function(
    Backbone, Marionette, Router, Controller, vent, pj, Login, Home, Setup, Restaurant, Register, GameDashboard, DBDashboard
  ) {
    'use strict';

    pj = JSON.parse(pj);

    var user,
        router,
        hash,
        model;
    var app = new Marionette.Application();
  
    app.addRegions({
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
        //e.stopImmediatePropagation();
        //return false;
      });

      hash = window.location.hash;
      app.main.show(new Login());
    });

    app.on('initialize:after', function(options) {
      router = new Router({ controller: Controller });
      Backbone.history.start();
    });

    vent.on('login:success', function(data) {
      if (!data.r) {
        model = new Restaurant();
      }
      else {
        model = new Restaurant(data.r);
      }

      initInterface(data);
    });

    vent.on('login:failure', function(error) {
      login.alert.show(new views.loginalert({ model: new Backbone.Model({ 'status': 'Error', 'message': error }) }));
    });

    vent.on('login:setupaccount', function() {
      app.main.show(new Register());
    });

    vent.on('nav:logout', function() {
      
    });

    vent.on('route:dashboard', function() {
      app.main.show(new GameDashboard());
    });

    vent.on('route:teradata', function() {
      app.main.show(new DBDashboard());
    });

    vent.on('route:home', function(init) {
      if (init) {
        app.main.show(new Setup());
      }
      else {
        app.main.show(new Home());
      }
    });

    function initInterface(u) {
      //user = _.clone(u.user, true);
      app.main.show(new Home({model: model}));

      router.navigate(hash || '#', { 'trigger': true });
    }

    return app;
  }
);
