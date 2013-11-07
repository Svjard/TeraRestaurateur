/*global define*/

define(['vent'], function (vent) {
  'use strict';

  return {
    dashboard: function() {
    	vent.trigger('route:dashboard');
    },
    teradata:function() {
    	vent.trigger('route:teradata');
    },
    home: function() {
    	vent.trigger('route:home');
    },
    init: function() {
    	vent.trigger('route:init');
    }
  };
});
