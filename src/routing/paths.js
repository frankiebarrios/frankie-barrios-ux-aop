/**
 * @fileoverview Routing paths.
 * Entries with empty strings are abstract - they are not
 * directly routable. Their callbacks are invoked
 * when a child route is activated.
 */

const RoutePaths = {
  INTERN_APP: '/',
  CREATE_USER: '/create-user',
  USER_LIST: '/user-list',
  USER_PROFILE: '/user-profile',
  EDIT_USER: '/edit-user'
};

module.exports = RoutePaths;