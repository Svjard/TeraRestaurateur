/*global define*/

define(
  ['marionette','vent','tpl!templates/home/setup.tmpl'],
  function (Marionette, vent, setup) {
    'use strict';

    return Marionette.ItemView.extend({
      template: setup,
      className: 'container',
      intialize: function() {
        
      }
    });
  }
);