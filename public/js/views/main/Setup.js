/*global define*/

define(
  ['marionette','vent','tpl!templates/main/setup.tmpl'],
  function (Marionette, vent, tmpl) {
    'use strict';

    return Marionette.ItemView.extend({
      template: tmpl,
      className: 'container',
      intialize: function() {
        
      }
    });
  }
);