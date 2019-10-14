/**
 * @fileoverview Routing paths.
 * Entries with empty strings are abstract - they are not
 * directly routable. Their callbacks are invoked
 * when a child route is activated.
 */

const RoutePaths = {
  INTERN_APP: '/intern-app',
  CREATE_USER: '/intern-app/create-user',
  USER_LIST: '/intern-app/user-list',
  USER_PROFILE: 'intern-app/user-profile',
  EDIT_USER: 'intern-app/edit-user'
};

module.exports = RoutePaths;