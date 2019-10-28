import { LitElement, html, css } from 'lit-element';
import '../intern-app.html';

class LitContainer extends LitElement {
  static get styles() {
    return css``;
  }
  render() {
    return html`
      <intern-app></intern-app>
    `;
  }
}
customElements.define('lit-container', LitContainer);
export default LitContainer;