require.config({
  baseUrl: 'js',
  paths: {
    'backbone':              '../vendor/backbone/backbone',
    'backbone.babysitter':   '../vendor/backbone.babysitter/lib/amd/backbone.babysitter',
    'backbone.wreqr':        '../vendor/backbone.wreqr/lib/amd/backbone.wreqr',
    'backbone.validation':   '../vendor/backbone.validation/dist/backbone-validation-amd',
    'bootstrap':             '../vendor/bootstrap/dist/js/bootstrap',
    'd3':                    '../vendor/d3/d3',
    'jquery':                '../vendor/jquery/jquery',
    'json':                  '../vendor/json2/json2',
    'sockjs':                '../vendor/sockjs-client/sockjs', // requires building, see README.md
    'marionette':            '../vendor/marionette/lib/core/amd/backbone.marionette',
    'pj':                    'package.json', //symlink of root package.json
    'text':                  '../vendor/text/text',
    'tpl':                   '../vendor/tpl/tpl',
    'underscore':            '../vendor/lodash/dist/lodash',
    'moment':                '../vendor/momentjs/min/moment-with-langs', 
  },
  shim : {
    'backbone' : {
      deps : ['jquery', 'underscore'],
      exports : 'Backbone'
    },
    'backbone.validation' : {
      deps : ['backbone']
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'jquery' : {
      exports : 'jQuery'
    },
    'underscore' : {
      exports : '_'
    },
    'sockjs': {
      'exports': 'SockJS'
    },
    'json' : {
      exports : 'JSON'
    },
    'd3' : {
      exports : 'd3'
    }
  }
});

require(
  ['app','backbone','backbone.validation','bootstrap','json','sockjs'],
  function(app, Backbone){
    'use strict';
    
    app.start();
  }
);
