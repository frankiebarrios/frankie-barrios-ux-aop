import { LitElement, html, css } from 'lit-element';
import bindPropertiesFromParentRouteMixin from '@app/routing/bindPropertiesFromParentRouteMixin.js';
const RouteMixin = require('node_modules/@banno/web-component-router/routing-mixin');
import { PropertyEffects } from 'node_modules/@banno/polymer/lib/mixins/property-effects.js';

class EditUser extends bindPropertiesFromParentRouteMixin(RouteMixin(PropertyEffects(LitElement))) {
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