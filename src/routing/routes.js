/**
 * @fileoverview
 *
 * Route tree definition for Onboarding Project.
 *           _________INTERN-APP___________
 *         /                                \
 *  CREATE-USER                           USER-LIST
 *                                            \
 *                                        USER-PROFILE
 *                                              \
 *                                           EDIT-USER
 * 
 * FIRST THING WILL BE TO SETUP A TEST PAGE TO ROUTE BACK AND FORTH FROM 
 * MY MAIN APP.              
*/ 
const RouteData = require('@banno/web-component-router/lib/route-data');
const RouteTreeNode = require('@banno/web-component-router/lib/route-tree-node');

// CREATES INTERN_APP, WILL BE TOP OF TREE
const internApp = new RouteTreeNode(
  new RouteData('InternApp', 'INTERN_APP', '', [], false));

// Creates CREATE_USER node
const createUserNode = new RouteTreeNode(
  new RouteData('CreateUser', 'CREATE_USER', '/create-user'));

// Creates USER_LIST node
const userListNode = new RouteTreeNode(
  new RouteData('UserList', 'USER_LIST', '/user-list'));

// Create USER_PROFILE noce
const userProfileNode = new RouteTreeNode(
  new RouteData('UserProfile', 'USER_PROFILE', '/user-profile'));

// Creates EDIT_USER node
const editUserNode = new RouteTreeNode(
  new RouteData('EditUser', 'EDIT_USER', '/edit-user'));

/* ADDING CHILD NODES TO TREE */
internApp.addChild(createUserNode);
internApp.addChild(userListNode);
internApp.addChild(userProfileNode);
internApp.addChild(editUserNode);

module.exports = internApp;






