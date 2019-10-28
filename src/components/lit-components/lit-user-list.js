import { LitElement, html, css } from 'lit-element';

// Rendering this third party LE Component within this LE Component
import  '@banno/jha-web-components/src/buttons/jha-button/jha-button';

// Rendering within this LE Component
import '../user-profile.html';

// Using to utilize API
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
      <jha-button @click="${this.getUsers}">LitElement Button</jha-button>
      <user-profile></user-profile>
    `;
  }

  async getUsers() {
    this.users = await storage.getAllUsers();
    console.log('Users', this.users);
  }
}
customElements.define('lit-user-list', LitUserList);
export default LitUserList;