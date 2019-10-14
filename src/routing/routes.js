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

import RoutePaths from './paths.js';
import RouteId from './id.js';
import RouteData from '../../node_modules/@banno/web-component-router/lib/route-data.js';
import RouteTreeNode from '../../node_modules/@banno/web-component-router/lib/route-tree-node.js';

const viewInheritedProperties = [
  'storage'
]

const routeData = {
  title: 'Intern App',
  args: [RouteId.INTERN_APP, 'INTERN-APP', RoutePaths.INTERN_APP, true],
  children: [
    {
      title: 'Create User',
      inheritedProperties: [...viewInheritedProperties],
      args: [RouteId.CREATE_USER, 'CREATE-USER', RoutePaths.CREATE_USER, true]
    },
    {
      title: 'User List',
      inheritedProperties: [...viewInheritedProperties],
      args: [RouteId.USER_LIST, 'USER-LIST', RoutePaths.USER_LIST, true]
    },
    {
      title: 'User Profile',
      inheritedProperties: [...viewInheritedProperties],
      args: [RouteId.USER_PROFILE, 'USER-PROFILE', RoutePaths.USER_PROFILE, true]
    },
    {
      title: 'Edit User',
      inheritedProperties: [...viewInheritedProperties],
      args: [RouteId.EDIT_USER, 'EDIT-USER', RoutePaths.EDIT_USER, true]
    }
  ]
}

function buildRouteTree(nodeData) {
  const node = new RouteTreeNode(new RouteData(...nodeData.args));
  node.title = nodeData.title;
  node.inheritedProperties = nodeData.inheritedProperties;
  node.navItems = nodeData.navItems;
  if (nodeData.children) {
    nodeData.children.forEach(nodeData => {
      node.addChild(buildRouteTree(nodeData));
    });
  }
  return node;
}

export default buildRouteTree(routeData);
