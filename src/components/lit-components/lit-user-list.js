import { LitElement, html, css } from 'lit-element';
import './lit-user-profile';

class LitUserList extends LitElement {
  static get properties() {
    return {
      storage: {
        type: Array
      }
    };
  }

  constructor() {
    super();
    this.storage = {};
  }

  static get styles() {
    return css``;
  }

  render() {
    return /**/html`
      ${this.users.map(user => html`
        <lit-user-profile
          .user=${user}
          .storage=${this.storage}
        ></lit-user-profile>
      `)}
    `;
  }
}
customElements.define('lit-user-list', LitUserList);
export default LitUserList;