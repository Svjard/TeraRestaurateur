define(
  ['backbone'],
  function(Backbone){
    'use strict';

    return Backbone.Model.extend({
      idAttribute: 'id',
      urlRoot: 'rest/restuarants',
      intialize: function() {
        
      }
    });
  }
);
