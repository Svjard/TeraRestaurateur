/*global define*/

define(
  ['marionette','vent','tpl!templates/home.tmpl'],
  function (Marionette, vent, home) {
    'use strict';

    return Marionette.ItemView.extend({
      template: home,
      onShow: function() {
      	$(this.el).find('.modal').modal({
      		'backdrop' : false,
      		'keyboard' : true,
      		'show' : true
      	});
      }
    });
  }
);