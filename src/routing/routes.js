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

const viewInheritedProperties {
  // Figure out how to add FirebaseAPI in here 
}

// Configure correct paths and ids
const routeData = {
  title: 'Intern App',
  navItems: [
    { label: 'Dashboard', path: RoutePaths.REPORTS_APP_USAGE, icon: 'jha-icon-dashboard' },
  ],
  args: [RouteId.REPORTS_APP, 'REPORTS-APP', RoutePaths.REPORTS_APP, ['institutionShortId'], true],
  children: [
    {
      title: 'User List',
      inheritedProperties: [...viewInheritedProperties],
      args: [RouteId.REPORTS_APP_USAGE, 'REPORTS-APP-USAGE', RoutePaths.REPORTS_APP_USAGE, ['institutionShortId'], true]
    },
    {
      title: 'User Profile',
      inheritedProperties: [...viewInheritedProperties],
      args: [RouteId.REPORTS_APP_USAGE, 'REPORTS-APP-USAGE', RoutePaths.REPORTS_APP_USAGE, ['institutionShortId'], true]
    },
    {
      title: 'Edit User',
      inheritedProperties: [...viewInheritedProperties],
      args: [RouteId.REPORTS_APP_USAGE, 'REPORTS-APP-USAGE', RoutePaths.REPORTS_APP_USAGE, ['institutionShortId'], true]
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
