/*global define*/

define(
  ['marionette','vent','tpl!templates/home.tmpl',
   'views/home/Dashboard'],
  function (Marionette, vent, home, Dashboard) {
    'use strict';

    return Marionette.Layout.extend({
      template: home,
      regions: {
      	'content' : '#content'
      },
      onShow: function() {
      	$(this.el).find('.modal').modal({
      		'backdrop' : false,
      		'keyboard' : true,
      		'show' : true
      	});

      	this.content.show(new Dashboard());
      }
    });
  }
);