import { LitElement, html, css } from 'lit-element';
const Route_Mixin = require('../../../node_modules/@banno/web-component-router/routing-mixin');
const router = require('../../../node_modules/@banno/web-component-router');
import routeTree from '../../routing/routes';

import bindPropertiesFromParentRouteMixin from '../../routing/bindPropertiesFromParentRouteMixin';
import Route_Paths from '../../routing/paths.js';
import Route_Ids from '../../routing/id.js';
import './lit-user-profile';

class LitUserList extends bindPropertiesFromParentRouteMixin(Route_Mixin(LitElement)) {
// class LitUserList extends Route_Mixin(LitElement) {
  static get properties() {
    return {
      storage: {
        type: Object
      },
      users: {
        type: Array
      }
    };
  }

  static get styles() {
    return css``;
  }

  render() {
    return /**/html`
      ${this.users.map(user => html`
        <lit-user-profile
          .user=${user}
          .storage=${this.storage}
        ></lit-user-profile>
      `)}
    `;
  }
}
customElements.define('lit-user-list', LitUserList);
export default LitUserList;