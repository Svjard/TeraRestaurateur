/*global define*/

define(
  ['marionette','vent','tpl!templates/login.tmpl'],
  function (Marionette, vent, login) {
    'use strict';

    return Marionette.ItemView.extend({
      template: login,
      className: 'login-container',
      events: {
        'click #login-btn' : 'login'
      },
      login: function() {
        vent.trigger('login:success');
      }
    });
  }
);