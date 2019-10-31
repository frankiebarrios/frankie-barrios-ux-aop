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

      .card {
        padding: 5px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        border-radius: 20px;
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
    `;
  }

  render() {
    return html`
      <div>
        ${this.users.map(user => html`
          <div class="card">
            <div class="profileIcons">
              <jha-icon-circle-plus-outline>
            </div>
            <table class="container">
              <tr>
                <td>Name:</td>
                <td>${user.firstName} ${user.lastName}</td>
              </tr>
            </table>
          </div>
        `)}
      </div>
    `;
  }

  async connectedCallback() {
    super.connectedCallback()
    this.users = await this.getUsers();
  }

  // Original attempt to pull in user data:
  // connectedCallback() {
  //   super.connectedCallback();
  //   this.users = this.getUsers();
  // }

  async getUsers() {
    let users = await storage.getAllUsers();
    return users;
  }

}
customElements.define('lit-user-list', LitUserList);
export default LitUserList;