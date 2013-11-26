define(
  ['backbone'],
  function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
      idAttribute: '_id',
      url: 'api/users'
    });
  }
);