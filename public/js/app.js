/*global $*/
define(
  [
    'backbone','marionette','router','controller','vent','text!pj',
    'views/Login'
  ],
  function(
    Backbone, Marionette, Router, Controller, vent, pj, Login
  ) {
    'use strict';

    pj = JSON.parse(pj);

    var user,
        router,
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

      console.log(vent.trigger);
      vent.trigger('login:success');
    });

    app.on('initialize:after', function(options) {
      router = new Router({ controller: Controller });
      Backbone.history.start();
    });

    vent.on('login:success', function(data) {
       initInterface(data);
    });

    vent.on('login:failure', function(error) {
      login.alert.show(new views.loginalert({ model: new Backbone.Model({ 'status': 'Error', 'message': error }) }));
    });

    vent.on('nav:logout', function() {
      
    });

    function initInterface(u) {
      //user = _.clone(u.user, true);
      console.log('OK');
      app.main.show(new Login());
      
      router.navigate(window.location.hash || '#', { 'trigger': true });
    }

    return app;
  }
);
