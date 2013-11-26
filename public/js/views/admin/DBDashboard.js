/*global define*/

define(
  ['marionette','vent','tpl!templates/dbdashboard.tmpl'],
  function (Marionette, vent, dbdashboard) {
    'use strict';

    return Marionette.ItemView.extend({
      template: dbdashboard
    });
  }
);