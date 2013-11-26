define(
  ['backbone'],
  function (Backbone) {
    'use strict';

    return Backbone.Collection.extend({
      idAttribute: '_id',
      url: 'api/users'
    });
  }
);