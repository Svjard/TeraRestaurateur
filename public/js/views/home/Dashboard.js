/*global define*/

define(
  ['marionette','vent','tpl!templates/home/dashboard.tmpl'],
  function (Marionette, vent, dashboard) {
    'use strict';

    return Marionette.ItemView.extend({
      template: dashboard,
      className: 'container',
      intialize: function() {
        
      },
      onShow: function() {
      	//$('.carousel').carousel();
      }
    });
  }
);