/*global define*/

define(
  ['marionette','vent','tpl!templates/register.tmpl',
  ],
  function (Marionette, vent, register) {
    'use strict';

    return Marionette.ItemView.extend({
      template: register,
      className: 'tr-container container',
      events: {
        'submit #register-form' : 'register'
      },
      register: function() {
        // Verify all the fields are completed
        var isValid = true;
        $(this.el).find('.form-control').each(function() {
          if ($(this).val().length === 0) {
            $(this).next().toggleClass('hide').end().parent().addClass('has-error');
            $(this).on('keyup', function(ev) {
              if ($(this).val().length !== 0) {
                $(this).next().toggleClass('hide').end().parent().removeClass('has-error');
              }
            });
            isValid = false;
          }
        });

        if (!isValid) {
          return;
        }
      }
    });
  }
);