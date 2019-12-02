import { LitElement, html, css } from 'lit-element';
import bindPropertiesFromParentRouteMixin from '@app/routing/bindPropertiesFromParentRouteMixin.js';
const RouteMixin = require('node_modules/@banno/web-component-router/routing-mixin');

class EditUser extends RouteMixin(LitElement) {
  static get styles() {
    return css``;
  }
  render() {
    return html`
      <h1>Edit User Page</h1>
    `;
  }
}
customElements.define('edit-user', EditUser);
export default EditUser;