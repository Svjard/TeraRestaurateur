/*global define*/

define(
  ['marionette','vent','tpl!templates/main/users.tmpl','collections/Users'],
  function (Marionette, vent, tmpl, Users) {
    'use strict';

    return Marionette.ItemView.extend({
      template: tmpl,
      templateHelpers: function() {
      	return {users: this.users};
      },
      className: 'container',
      events: {
      	'change [type="text"]'		: 'filter',
      	'change [type="checkbox"]'	: 'checkin'
      },
      inititialize: function() {
      	var self = this;
      	this.users = new Users();
      	this.users.fetch({
      		success: function() {
      			self.render();
      		}
      	})
      },
      filter: function(ev) {
      	//filter this.users ?
      	this.render();
      },
      checkin: function(ev) {
      	// update user object?
      	// this.render() (fix the checkin as read-only?)
      }
    });
  }
);