/*global define*/

define(
  ['marionette','vent','tpl!templates/login.tmpl'],
  function (Marionette, vent, login) {
    'use strict';

    return Marionette.ItemView.extend({
      template: login,
      className: 'tr-container container',
      events: {
        'submit #login-form' : 'login',
        'click #signup-btn' : 'setupAccount'
      },
      login: function() {
        // Validate username and password are not empty.
        // Additionally username in the form of an email string.
      },
      setupAccount: function() {
        vent.trigger('login:setupaccount');
      }
    });
  }
);