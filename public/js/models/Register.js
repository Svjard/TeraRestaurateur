define(
  ['backbone'],
  function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
      defaults: {
        firstname: '',
        lastname: '',
        username: '',
        company: '',
        title: '',
        passw: '',
        confirm-passw: ''
      },
      validation: {
        'firstname': {
          required: true,
          msg: 'First name is required.'
        },
        'lastname': {
          required: true,
          msg: 'Last name is required.'
        },
        'username': {
          required: true,
          msg: 'Username is required.'
        },
        'passw': [{
          required: true,
          msg: 'Password is required.'
        }, {
          minLength: 5,
          msg: 'Password must be at least 5 characters in length.'
        }],
        'confirm-passw': [{
          required: true,
          msg: 'Confirmation password is required.'
        }, {
          equalTo: 'passw',
          msg: 'Confirmation password must match your password.'
        }]
      }
    });
  }
);
