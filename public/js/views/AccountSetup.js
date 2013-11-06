/*global define*/

define(
  ['marionette','vent','tpl!templates/accountsetup.tmpl',
  ],
  function (Marionette, vent, accountsetup) {
    'use strict';

    return Marionette.ItemView.extend({
      template: accountsetup,
      className: 'tr-container container',
      events: {
        'click #create-account' : 'createAccount'
      },
      createAccount: function() {
        // Verify all the fields are completed
        
      }
    });
  }
);