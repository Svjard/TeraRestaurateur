/*global define*/

define(['vent'], function (vent) {
  'use strict';

  return {
    datatemperature: function() {

    },
    config:function(id) {
    	vent.trigger('config:load', id);
    }
  };
});
