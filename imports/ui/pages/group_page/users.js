import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { $ } from 'meteor/jquery';

import { Groups } from '../../../api/groups/groups.js';

import './users.html';
import './users_item.js';

Template.users.onCreated(function usersOnCreated() {
	this.subscribe('users');
});

Template.users.rendered = function() {
	$('.modal-trigger').leanModal();
}

Template.users.helpers({
	usersList() {
		if(!Meteor.user()) return;

		return Meteor.users.find();
	},

	groupCreator() {
		let id = FlowRouter.getParam('groupId');
		if (!Groups.findOne(id)) return;
		
		return Groups.findOne().isGroupCreator(id);
	}
});

Template.users.events({
	'click #addParticipant'() {
		// initialize dropdown
		$('select').material_select();
		// open modal window
		$('#modal1').openModal();
	},

	'submit #user-choose'(e, template) {
		e.preventDefault();

		let selectedUsr = $('#user-select').val();
	}
});


		
