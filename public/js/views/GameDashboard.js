/*global define*/

define(
  ['marionette','vent','tpl!templates/gamedashboard.tmpl'],
  function (Marionette, vent, gamedashboard) {
    'use strict';

    return Marionette.ItemView.extend({
      template: gamedashboard
    });
  }
);