/**
 * @fileoverview
 *
 * Route tree definition for Onboarding Project.
 *           _________INTERN-APP___________
 *         /                                \
 *  CREATE-USER                           EDIT-USER
 * 
 * NOT 100% SURE WHICH FILES SHOULD HAVE ROUTES JUST YET ^^^
 * NEED TO ADD ANOTHER PAGE THAT COME BEFORE MY MAIN APP
 * MAYBE A LOGIN/ WELCOME PAGE OR SOMETHING???
 * 
 * FIRST THING WILL BE TO SETUP A TEST PAGE TO ROUTE BACK AND FORTH FROM 
 * MY MAIN APP.   
 * 
 *                           TEST SETUP
 *                          _____________
 *                           APP-ELEMENT
 *                                |                              
*                            INTERN-APP
*                                 |        
*                            TEST-ROUTE             
*/ 
const RouteData = require('@banno/web-component-router/lib/route-data');
const RouteTreeNode = require('@banno/web-component-router/lib/route-tree-node');

// To create a tree you create `RouteTreeNodes` and add children.

// Creates TEST-ROUTE node
const testRoute = new RouteTreeNode(
  new RouteData('TestRoute', 'TEST-ROUTE', '/'));

// Creates INTERN-APP node
const internApp = new RouteTreeNode(
  new RouteData('InternApp', 'INTERN-APP', ''));

// Adds TEST-ROUTE as a child of INTERN-APP
internApp.addChild(testRoute);

// Creates Main APP-ELEMENT node, Top of Tree
// Not sure what all of the params here are for?
const app = new RouteTreeNode(
  new RouteData('App', 'APP-ELEMENT', '', [], false));

// Adds INTERN-APP as a child of APP
app.addChild(internApp);

module.exports = app;






