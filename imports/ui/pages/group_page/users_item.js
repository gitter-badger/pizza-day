import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Materialize } from 'meteor/materialize:materialize';

import { Groups } from '../../../api/groups/groups.js';

import './users_item.html';

Template.usersItem.helpers({
 userIsGroupCreator() {
  const id = FlowRouter.getParam('groupId');
  if (!Groups.findOne(id)) return;

  return Groups.findOne(id).creator === this._id;
 },

 hasGroupCreatorRights() {
  const id = FlowRouter.getParam('groupId');
  if (!Groups.findOne(id)) return;

  return Groups.findOne(id).creator === Meteor.userId();
 },

 userIsOwner() {
  const id = FlowRouter.getParam('groupId');
  if (!Groups.findOne(id)) return;

  return !(Groups.findOne(id).creator === this._id);
 },
});

Template.usersItem.events({
 'click #removeUser'() {
  const groupId = FlowRouter.getParam('groupId');
  if (!Groups.findOne(groupId)) return;

  Meteor.call('groups.removeUser', {
   groupId,
   userId: this._id,
  }, (err) => {
   if(err) {
    console.log(err);
   } else {
    Materialize.toast('Participant removed', 4000);
   }
  });
 },
});
