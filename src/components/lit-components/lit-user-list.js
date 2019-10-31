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
    return css`
      td {
        padding: 12px;
      }

      tr:nth-child(odd) {
        background-color: #f2f2f2;
      }

      .container {
        padding: 0 16px 8px 16px;
        display: inline-flex;
      }
    `;
  }

  // Look at using lifecycle methods to pull users into state
  // without having to trigger something to do so.

  render() {
    return html`
      <jha-button @click="${this.getUsers}">LitElement Button</jha-button>
    `;
  }

  // render() {
  //   return html`
  //     <div>
  //       ${users.map(user => html`
  //         <div>
  //           <table class="container">
  //             <tr>
  //               <td>Name:</td>
  //               <td>${user.firstName} ${user.lastName}</td>
  //             </tr>
  //             <tr>
  //               <td>Id:</td>
  //               <td>${user.id}</td>
  //             </tr>
  //           </table>
  //         </div>
  //       `)}
  //     </div>
  //   `;
  // }

  async getUsers() {
    let users = await storage.getAllUsers();
    console.log('Users', users);
    return users;
  }
}
customElements.define('lit-user-list', LitUserList);
export default LitUserList;