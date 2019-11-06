import { LitElement, html, css } from 'lit-element';
import './lit-user-list';

class LitUserContainer extends LitElement {
  static get styles() {
    return css``;
  }
  render() {
    return html`
      <h2>Lit User Container</h2>
      <lit-user-list></lit-user-list>
    `;
  }
}
customElements.define('lit-user-container', LitUserContainer);
export default LitUserContainer;