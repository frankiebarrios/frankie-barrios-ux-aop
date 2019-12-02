import { LitElement, html, css } from 'lit-element';

class UserPage extends LitElement {
  static get styles() {
    return css``;
  }
  render() {
    return html`
      <h1>User Page</h1>
    `;
  }
}
customElements.define('user-page', UserPage);
export default UserPage;