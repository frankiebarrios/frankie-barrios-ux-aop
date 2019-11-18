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
*/

import RoutePaths from './paths.js';
import RouteId from './id.js';
import RouteData from '../../node_modules/@banno/web-component-router/lib/route-data.js';
import RouteTreeNode from '../../node_modules/@banno/web-component-router/lib/route-tree-node.js';

const viewInheritedProperties = [
  'storage',
  'users'
]

const routeData = {
  title: 'Intern App',
  args: [RouteId.INTERN_APP, 'lit-intern-app', RoutePaths.INTERN_APP, ['lit-intern-app'], true],
  children: [
    {
      title: 'Create User',
      inheritedProperties: [...viewInheritedProperties],
      args: [RouteId.CREATE_USER, 'create-user', RoutePaths.CREATE_USER, ['create-user'], true]
    },
    {
      title: 'User List',
      inheritedProperties: [...viewInheritedProperties],
      args: [RouteId.USER_LIST, 'lit-user-list', RoutePaths.USER_LIST, ['lit-user-list'], true]
    },
    {
      title: 'User Profile',
      inheritedProperties: [...viewInheritedProperties],
      args: [RouteId.USER_PROFILE, 'lit-user-profile', RoutePaths.USER_PROFILE, ['lit-user-profile'], true]
    },
    {
      title: 'Edit User',
      inheritedProperties: [...viewInheritedProperties],
      args: [RouteId.EDIT_USER, 'EDIT-USER', RoutePaths.EDIT_USER, ['edit-user'], true]
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
