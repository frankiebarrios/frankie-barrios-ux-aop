import { LitElement, html, css } from 'lit-element';
import { FirebaseAPI } from '../../api/firebaseAPI';

const storage = new FirebaseAPI();

class LitUserList extends LitElement {
  static get properties() {
    return {
      users: {
        type: Object,
        value: {}
      },
      storage: {
        value: () => storage
      },
      profileExpanded: {
        type: Boolean,
        value: true
      },
      testAttribute: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.users = {};
    this.testAttribute = null;
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

      .card {
        padding: 5px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        margin-bottom: 25px;
        margin-top: 50px;
      }

      .profileIcons {
        width: 100%;
        display: inline-flex;
        flex-direction: row;
        justify-content: flex-end;
      }

      jha-icon-circle-plus-outline {
        fill: #6495ED;
      }

      .div-center {
        text-align: center;
      }
    `;
  }

  // dom-if example
  // render() {
  //   return html`
  //     <div>
  //       ${(this.profileExpanded ? html`
  //         <h1>True</h1>
  //         <jha-icon-circle-plus-outline @click="${this.expandCollapseCard}">
  //         ` : html`
  //         <h1>False</h1>
  //         <jha-icon-circle-plus-outline @click="${this.expandCollapseCard}">
  //       `)}
  //     </div>
  //   `;
  // }

  // dom-repeat example
  render() {
    return html`
    <h1>Lit User List</h1>
      <div>
        ${this.users.map(user => html`
          <div class="card">
            <div class="profileIcons">
              <jha-icon-circle-plus-outline @click="${this.expandCollapseCard}">
            </div>
            <h3 class="div-center">User Profile</h3>
            <table class="container">
              <tr>
                <td>${this.testAttribute}</td>
                <td>Name:</td>
                <td>${user.firstName} ${user.lastName}</td>
              </tr>
            </table>
          </div>
        `)}
      </div>
    `;
  }

  // The way I am pulling in data here is throwing off my loading.
  // Need to fix this. Use events like in other components to accomplish this.
  async connectedCallback() {
    super.connectedCallback()
    this.users = await this.getUsers();
  }

  // Original attempt to pull in user data:
  // connectedCallback() {
  //   super.connectedCallback();
  //   this.users = this.getUsers();
  //   console.log('Users: ', this.users);
  // }

  expandCollapseCard() {
    this.profileExpanded ? this.profileExpanded = false :
      this.profileExpanded = true;
  }

  async getUsers() {
    let users = await storage.getAllUsers();
    return users;
  }

}
customElements.define('lit-user-list', LitUserList);
export default LitUserList;