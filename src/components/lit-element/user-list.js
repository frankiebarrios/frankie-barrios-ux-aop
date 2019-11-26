import { LitElement, html, css } from 'lit-element';
import bindPropertiesFromParentRouteMixin from '@app/routing/bindPropertiesFromParentRouteMixin';
import './user-profile';
const Route_Mixin = require('node_modules/@banno/web-component-router/routing-mixin');

class UserList extends bindPropertiesFromParentRouteMixin(Route_Mixin(LitElement)) {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      users: Object,
      storage: { type: Object }
    };
  }

  render() {
    return /**/html`
      ${this.users.map(user => html`
        <user-profile
          .user=${user}
          .storage=${this.storage}
        ></user-profile>
      `)}
    `;
  }
}
customElements.define('user-list', UserList);
export default UserList;