import { LitElement, html, css } from 'lit-element';
import './lit-user-list';

class LitUserContainer extends LitElement {
  static get styles() {
    return css``;
  }
  render() {
    const testValue = 'Hello World';
    return html`
      <h2>Lit User Container</h2>
      <lit-user-list
        .testAttribute=${testValue}
      ></lit-user-list>
    `;
  }
}
customElements.define('lit-user-container', LitUserContainer);
export default LitUserContainer;