define(
  ['backbone'],
  function(Backbone){
    'use strict';

    return Backbone.Model.extend({
      idAttribute: 'id',
      urlRoot: 'rest/restuarants',
      defaults: {
        name : null,
        styles: [{
            'name': 'Causal Dining',
            'description': 'A casual dining restaurant is a restaurant that serves moderately-priced food in a casual atmosphere.',
            'image' : 'casualdining.jpg'
          },{
            'name': 'Fine Dining',
            'description': 'Fine dining restaurants are full service restaurants with specific dedicated meal courses.',
            'image' : 'finedining.jpg'
          }
        ],
        cuisines: [{
            'name': 'American'
          },{
            'name': 'Asian'
          },{
            'name': 'Barbeque'
          },{
            'name': 'Caribbean/ Canjun/ Creole/ Southern'
          },{
            'name': 'Chinese'
          },{
            'name': 'Continental/ French'
          },{
            'name': 'Deli/ Dessert'
          },{
            'name' : 'Eclectic/ American'
          },{
            'name': 'Ethiopian'
          },{
            'name': 'Indian'
          },{
            'name': 'Italian'
          },{
            'name': 'Jamaican'
          },{
            'name': 'Japanese'
          },{
            'name': 'Korean'
          },{
            'name': 'Mediterranean'
          },{
            'name': 'Mexican/ Texan/ Southern'
          },{
            'name': 'Middle Eastern/ Greek'
          },{
            'name': 'North African'
          },{
            'name': 'Portugese/ Spanish'
          },{
            'name': 'Puerto Rican'
          },{
            'name': 'Russian'
          },{
            'name': 'Seafood'
          },{
            'name': 'Thai'
          },{
            'name': 'Vegan Macrobiotic'
          }
        ]
      },
      intialize: function() {
        
      }
    });
  }
);
