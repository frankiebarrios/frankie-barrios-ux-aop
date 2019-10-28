import { LitElement, html, css } from 'lit-element';
import  '@banno/jha-web-components/src/buttons/jha-button/jha-button';
import '../user-profile.html';
import { FirebaseAPI } from '../../api/firebaseAPI';

const storage = new FirebaseAPI();

class LitUserList extends LitElement {
  static get properties() {
    return {
      users: { type: Object },
      storage: {
        value: () => storage
      },
    };
  }

  constructor() {
    super();
    this.users = [];
  }

  static get styles() {
    return css``;
  }

  render() {
    return html`
      <jha-button @click="${this.pullInUsers}">LitElement Button</jha-button>
      <user-profile></user-profile>
    `;
  }

  async pullInUsers() {
    this.users = await storage.getAllUsers();
    console.log('Users', this.users);
  }
}
customElements.define('lit-user-list', LitUserList);
export default LitUserList;