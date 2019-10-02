/**
 * @fileoverview Dependency enum used to create a routing tree.
 * All components which register a route must have a unique entry.
 */

 /** @enum {string} tag name mapping */
const RouteId = {
  INTERN_APP: 'IA',
  CREATE_USER: 'CU',
  USER_LIST: 'UL',
  USER_PROFILE: 'UP',
  EDIT_USER: 'EU',
};

export default RouteId;