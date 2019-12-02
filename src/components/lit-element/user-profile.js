import { LitElement, html, css } from 'lit-element';
const Route_Mixin = require('node_modules/@banno/web-component-router/routing-mixin');
import bindPropertiesFromParentRouteMixin from '@app/routing/bindPropertiesFromParentRouteMixin';
import 'node_modules/@banno/jha-design-components/icons/jha-icon-circle-minus-outline.html';
import 'node_modules/@banno/jha-design-components/icons/jha-icon-circle-plus-outline.html';
import 'node_modules/@banno/jha-design-components/icons/jha-icon-edit-outline.html';
import 'node_modules/@banno/jha-design-components/icons/jha-icon-delete-outline.html';


class UserProfile extends bindPropertiesFromParentRouteMixin(Route_Mixin(LitElement)) {
  static get styles() {
    return css`
      .div-center {
        text-align: center;
      }

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
        margin-bottom: 12px;
        margin-top: 12px;
        max-width: 300px;
        min-width: 200px;
      }

      .profileIcons {
        width: 100%;
        display: inline-flex;
        flex-direction: row;
        justify-content: flex-end;
      }

      .formActionIcons {
        width: 100%;
        display: inline-flex;
        flex-direction: row;
        justify-content: space-around;
        padding-top: 6%;
      }

      jha-icon-circle-plus-outline,
      jha-icon-circle-minus-outline,
      jha-icon-edit-outline,
      jha-icon-delete-outline {
        fill: #6495ED;
      }

      img {
        border-radius: 50%;
        padding-top: 8px;
        padding-bottom: 8px;
      }

      * {
        font-family: "Helvetica", Times, serif;
        font-weight: 400;
      }
    `;
  }

  static get properties() {
    return {
      storage: { type: Object },
      user: {
        type: Object
      },
      profileExpanded: {
        type: Boolean,
        value: false
      },
      buttonText: {
        type: String,
        value: 'Expand'
      },
      editButtonClicked: {
        type: Boolean,
        value: false
      }
    }
  }

  render() {
    return /**/html`
      ${(this.profileExpanded ?
        html`
          <div class="container">
            <div class="card div-center">
              <div class="profileIcons">
                <jha-icon-circle-minus-outline
                  @click="${this.expandCollapseCard}">
                </jha-icon-circle-minus-outline>
              </div>
              <h2 class="div-center">User Profile</h2>
              <div class="div-center">
                <a href="/edit-user">
                  <img src="${this.user.img}" alt="Faker Avatar" height="96" width="96">
                </a>
              </div>
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
              <div class="div-center">
                <a href="/edit-user">
                  <img src="${this.user.img}" alt="Faker Avatar" height="64" width="64">
                </a>
              </div>
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

  routeEnter(currentNode, nextNode, routeId, context, next) {
    super.routeEnter(currentNode, nextNode, routeId, context, next)
    context.handled = true;
    const currentElement = currentNode.getValue().element;
    next();
  }

  routeExit(currentNode, nextNode, routeId, context, next) {
    super.routeExit(currentNode, nextNode, routeId, context, next)
    const currentElement = currentNode.getValue().element;
    if (currentElement.parentNode) {
      currentElement.parentNode.removeChild(currentElement);
    }
    currentNode.getValue().element = undefined;
    next();
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('Storage at User Profile: ', this.storage);
    this.addEventListener('updateUserList', this.editButtonClick);
  }

  expandCollapseCard() {
    this.profileExpanded = !this.profileExpanded;
    this.buttonText = !this.buttonText;
  }

  editButtonClick() {
    this.editButtonClicked = !this.editButtonClicked;
  }

  updateUser() {
    this.storage.updateUser(this.user.id, this.user);
  }

  updateUserList() {
    this.dispatchEvent(new CustomEvent('updateUserList', { bubbles: true, composed: true }));
  }

  deleteUser() {
    this.storage.deleteUser(this.user.id);
    this.updateUserList();
  }
}
customElements.define('user-profile', UserProfile);
export default UserProfile;