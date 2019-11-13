import { LitElement, html, css } from 'lit-element';
import '../intern-app.html';

class LitContainer extends LitElement {
  static get styles() {
    return css`
      div { border: 20px solid #6495ed; }
      .center { margin: auto; }
    `;
  }

  render() {
    return /**/html`
    <div>
      <intern-app></intern-app>
    </div>
    `;
  }
}
customElements.define('lit-container', LitContainer);
export default LitContainer;