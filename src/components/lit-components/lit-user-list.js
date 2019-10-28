import { LitElement, html, css } from 'lit-element';
import  '@banno/jha-web-components/src/buttons/jha-button/jha-button';
import '../user-profile.html';

class LitUserList extends LitElement {
  static get is() { return 'user-list'; }
    static get properties() {
      return {
        users: Object,
        storage: { type: Object }
    };
  }
  static get styles() {
    return css``;
  }
  render() {
    return html`
      <jha-button @click="${this.testFunction}">LitElement Button</jha-button>
      <user-profile user="[[user]]" storage="[[storage]]"></user-profile>
    `;
  }

  testFunction() {
    alert('Button Clicked');
  }
}
customElements.define('lit-user-list', LitUserList);
export default LitUserList;