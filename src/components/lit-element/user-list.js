import { LitElement, html, css } from 'lit-element';
import bindPropertiesFromParentRouteMixin from '@app/routing/bindPropertiesFromParentRouteMixin';
import './user-profile';
const Route_Mixin = require('node_modules/@banno/web-component-router/routing-mixin');

class UserList extends bindPropertiesFromParentRouteMixin(Route_Mixin(LitElement)) {
  static get styles() {
    return css`
      .container {
        padding-top: 25px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        overflow: scroll;
      }
    `;
  }

  static get properties() {
    return {
      users: Object,
      storage: { type: Object }
    };
  }

  render() {
    return /**/html`
      <div class="container">
        ${this.users.map(user => html`
          <user-profile style="padding-left: 15px; padding-right: 15px;"
            .user=${user}
            .storage=${this.storage}
          ></user-profile>
        `)}
      </div>
    `;
  }
}
customElements.define('user-list', UserList);
export default UserList;