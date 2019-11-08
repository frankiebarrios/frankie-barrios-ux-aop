/**
 * @fileoverview Dependency enum used to create a routing tree.
 * All components which register a route must have a unique entry.
 */

 /** @enum {string} tag name mapping */
const RouteId = {
  INTERN_APP: 'app',
  CREATE_USER: 'create',
  USER_LIST: 'list',
  USER_PROFILE: 'profile',
  EDIT_USER: 'edit',
};

export default RouteId;