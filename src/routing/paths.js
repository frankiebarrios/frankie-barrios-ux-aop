/**
 * @fileoverview Routing paths.
 * Entries with empty strings are abstract - they are not
 * directly routable. Their callbacks are invoked
 * when a child route is activated.
 */
const BASE_PATH = '';
// const DEV_SERVER = 'localhost:1820'

const RoutePaths = {
  INTERN_APP: ``,
  CREATE_USER: `/create-user`,
  USER_LIST: `${BASE_PATH}/user-list`,
  USER_PROFILE: `${BASE_PATH}/user-profile`,
  EDIT_USER: `${BASE_PATH}/edit-user`
};

module.exports = RoutePaths;