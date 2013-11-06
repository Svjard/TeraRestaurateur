/*global define*/

define(
  ['marionette','vent','tpl!templates/login.tmpl'],
  function (Marionette, vent, login) {
    'use strict';

    return Marionette.ItemView.extend({
      template: login,
      className: 'tr-container container',
      events: {
        'click #login-btn' : 'login',
        'click #signup-btn' : 'setupAccount'
      },
      login: function() {
        vent.trigger('login:success');
      },
      setupAccount: function() {
        vent.trigger('login:setupaccount');
      }
    });
  }
);