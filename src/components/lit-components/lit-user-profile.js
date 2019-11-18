import { LitElement, html, css } from 'lit-element';

class LitUserProfile extends LitElement {
  static get properties() {
    return {
      profileExpanded: {
        type: Boolean,
        value: true
      },
      user: {
        type: Object
      },
      storage: {
        type: Object
      }
    };
  }

  // constructor() {
  //   super();
  //   this.user = {};
  //   this.storage = {};
  // }

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
        margin-bottom: 10px;
        margin-top: 5px;
      }

      .profileIcons {
        width: 100%;
        display: inline-flex;
        flex-direction: row;
        justify-content: flex-end;
      }

      jha-icon-circle-plus-outline,
      jha-icon-circle-minus-outline {
        fill: #6495ED;
      }

      .div-center {
        text-align: center;
      }

      td {
        padding: 10px;
      }

      tr:nth-child(odd) {
        background-color: #f2f2f2;
      }

      .formActionIcons {
        width: 100%;
        display: inline-flex;
        flex-direction: row;
        justify-content: space-around;
        padding-top: 6%;
      }
    `;
  }

  render() {
    return /**/html`
      ${(this.profileExpanded ?
        html`
            <div class="card div-center">
              <div class="profileIcons">
                <jha-icon-circle-minus-outline
                  @click="${this.expandCollapseCard}">
                </jha-icon-circle-minus-outline>
              </div>
              <h3 class="div-center">User Profile</h3>
              <table class="container card">
                  <tr>
                    <td>Name:</td>
                    <td>${this.user.firstName} ${this.user.lastName}</td>
                  </tr>
                  <tr>
                    <td>Phone:</td>
                    <td>${this.user.phone}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>${this.user.email}</td>
                  </tr>
              </table>
              <div class="formActionIcons">
                  <jha-icon-edit-outline @click="${this.editButtonClick}"></jha-icon-edit-outline>
                  <jha-icon-delete-outline @click="${this.deleteUser}"></jha-icon-delete-outline>
              </div>
            </div>
        ` :
        html`
            <div class="card div-center">
              <div class="profileIcons">
                <jha-icon-circle-plus-outline
                  @click="${this.expandCollapseCard}">
                </jha-icon-circle-plus-outline>
              </div>
              <h3 class="div-center">User Profile</h3>
              <table class="container card">
                <tr>
                  <td>Name:</td>
                  <td>${this.user.firstName} ${this.user.lastName}</td>
                </tr>
              </table>
            </div>
          `)}
      `;
  }

  connectedCallback() {
    super.connectedCallback();
    // this.addEventListener('updateUserList', /* function to trigger with this listener */);
  }

  expandCollapseCard() {
    this.profileExpanded ? this.profileExpanded = false :
      this.profileExpanded = true;
  }

  updateUserList() {
    this.dispatchEvent(new CustomEvent('updateUserList', { bubbles: true, composed: true }));
  }

  deleteUser() {
    this.storage.deleteUser(this.user.id);
    this.updateUserList();
  }
}
customElements.define('lit-user-profile', LitUserProfile);
export default LitUserProfile;
