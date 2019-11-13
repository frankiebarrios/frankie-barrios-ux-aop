import { LitElement, html, css } from 'lit-element';
import { FirebaseAPI } from '../../api/firebaseAPI';
import './lit-user-list';

const storage = new FirebaseAPI();

class LitUserContainer extends LitElement {
  static get properties() {
    return {
      storage: {
        type: Array,
        value: storage
      }
    };
  }

  constructor() {
    super();
    this.storage = [];
  }

  render() {
    this.users = storage.getAllUsers();
    return /**/html`
      <lit-user-list
        .users=${this.users}
        .storage=${this.storage}>
      </lit-user-list>
    `;
  }
}
customElements.define('lit-user-container', LitUserContainer);
export default LitUserContainer;