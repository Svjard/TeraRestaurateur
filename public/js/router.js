define(
  ['marionette'],
  function (Marionette) {
    'use strict';

    return Marionette.AppRouter.extend({
      appRoutes: {
      	'dashboard'  : 'dashboard',
      	'teradata'   : 'teradata',
        'home'       : 'home',
        'home/init'  : 'init'
      }
    });
  }
);
