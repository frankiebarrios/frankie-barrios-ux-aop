import { LitElement, html, css } from 'lit-element';

class EditUser extends LitElement {
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