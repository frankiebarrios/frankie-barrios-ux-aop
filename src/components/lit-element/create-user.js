import { LitElement, html, css } from 'lit-element';

class CreateUser extends LitElement {
  static get styles() {
    return css``;
  }
  render() {
    return html`
      <h1>Create User Form</h1>
    `;
  }
}
customElements.define('create-user', CreateUser);
export default CreateUser;
// import { LitElement, html, css } from 'lit-element';
// import bindPropertiesFromParentRouteMixin from '../../../src/routing/bindPropertiesFromParentRouteMixin.js';
// const RouteMixin = require('@banno/web-component-router/routing-mixin');
// import "../../../node_modules/@banno/jha-design-components/icons/jha-icon-save-outline.html";

// class CreateUser extends bindPropertiesFromParentRouteMixin(RouteMixin(LitElement)) {
//   static get styles() {
//     return css`
//       :host {
//         display: block
//       }

//       .div-center {
//         text-align: center;
//       }

//       input[type=text],
//       select {
//         width: 100%;
//         padding: 12px 20px;
//         margin: 8px 0;
//         display: inline-block;
//         border-radius: 4px;
//         box-sizing: border-box;
//       }

//       div {
//         border-radius: 5px;
//         margin: auto;
//         width: 40%;
//       }

//       .container {
//         padding: 10px 16px;
//         width: 80%;
//       }

//       .container::after,
//       .row::after {
//         content: "";
//         clear: both;
//         display: table;
//       }

//       .card {
//         box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
//         padding-top: initial;
//         margin-top: 65px;
//       }

//       .icon {
//         fill: #6495ED;
//         height: 44px;
//         width: 44px;
//       }

//       .formIcons {
//         width: 100%;
//         display: inline-flex;
//         flex-direction: row;
//         justify-content: space-around;
//         padding-top: 6%;
//       }

//       .textContainer {
//         width: 100%;
//         display: inline-flex;
//         flex-direction: row;
//         justify-content: space-around;
//       }

//       .hasError {
//         border: solid 2px red;
//       }

//       * {
//         font-family: "Helvetica", Times, serif;
//       }
//     `;
//   }

//   static get properties() {
//     return {
//       storage: { type: Object },
//       user: {
//         firstName: '',
//         lastName: '',
//         phone: '',
//         email: '',
//         id: ''
//       },
//       hasError: {
//         type: Boolean,
//         value: false
//       },
//       firstNameError: {
//         type: String,
//         value: 'Must Enter A First Name!'
//       },
//       lastNameError: {
//         type: String,
//         value: 'Must Enter A Last Name!'
//       },
//       phoneError: {
//         type: String,
//         value: 'Invalid Phone Number Entered!'
//       },
//       emailError: {
//         type: String,
//         value: 'Invalid Email Address Entered!'
//       },
//       firstNameClass: {
//         type: String,
//         value: ''
//       },
//       firstNamePlaceholder: {
//         type: String,
//         value: 'Enter first name...'
//       },
//       lastNameClass: {
//         type: String,
//         value: ''
//       },
//       lastNamePlaceholder: {
//         type: String,
//         value: 'Enter last name...'
//       },
//       phoneClass: {
//         type: String,
//         value: ''
//       },
//       phonePlaceholder: {
//         type: String,
//         value: 'Enter phone number...'
//       },
//       emailClass: {
//         type: String,
//         value: ''
//       },
//       emailPlaceholder: {
//         type: String,
//         value: 'Enter email address...'
//       }
//     }
//   }

//   constructor() {
//     super();
//     this.user.firstName = '';
//   }

//   render() {
//     return /**/html`
//       <div class="card">
//         <div class="container">
//           <h2 class="div-center" style="font-weight: 400;">Create New User</h2>

//           <form>
//             <label>First Name</label>
//             <input type="text" id="firstName" .value="${this.user.firstName}">
//           </form>

//           <div class="formIcons">
//             <jha-icon-delete-outline on-click="deleteAllUsers" class="icon"></jha-icon-delete-outline>
//             <jha-icon-save-outline @click="${this.createUser}" class="icon"></jha-icon-save-outline>
//           </div>
//           <div class="textContainer">
//             <h5>Delete All Users</h5>
//             <h5>Create</h5>
//           </div>
//         </div>
//       </div>
//     `;
//   }

//   routeEnter(currentNode, nextNodeIfExists, routeId, context, next) {
//     super.routeEnter(currentNode, nextNodeIfExists, routeId, context, next)
//     context.handled = true;
//     const currentElement = currentNode.getValue().element;
//     next();
//   }

//   routeExit(currentNode, nextNode, routeId, context, next) {
//     super.routeExit(currentNode, nextNodeIfExists, routeId, context, next)
//     const currentElement = currentNode.getValue().element;
//     if (currentElement.parentNode) {
//       currentElement.parentNode.removeChild((currentElement));
//     }
//     currentNode.getValue().element = undefined;
//     next();
//   }

//   createUser() {
//     console.log(this.user);
//     // this.validateInput();
//     // if (!this.hasError) {
//     //this.storage.createUser(this.user);
//     //   this.user = {};
//     // }
//     // this.hasError = false;
//     this.dispatchEvent(new CustomEvent('updateUserList', { bubbles: true, composed: true }));
//   }

//   deleteAllUsers() {
//     alert('Bella Is Not Cool');
//     //this.storage.deleteAllUsers();
//     // By dispatching this event here were triggering any listener functions
//     // elsewhere in the app that will update the user list without reloading the page
//     //this.dispatchEvent(new CustomEvent('updateUserList', { bubbles: true, composed: true }));
//   }

//   validateInput() {
//     this.validateFirstName();
//     this.validateLastName();
//     this.validatePhone();
//     this.validateEmail();
//   }

//   validateFirstName() {
//     if (!this.user.firstName) {
//       this.hasError = true;
//       this.firstNameClass = 'hasError';
//       this.firstNamePlaceholder = this.firstNameError;
//     } else {
//       this.firstNameClass = '';
//     }
//   }

//   validateLastName() {
//     if (!this.user.lastName) {
//       this.hasError = true;
//       this.lastNameClass = 'hasError';
//       this.lastNamePlaceholder = this.lastNameError;
//     } else {
//       this.lastNameClass = '';
//     }
//   }

//   validatePhone() {
//     const phoneRegex = /^\d{10}$/;
//     if (!this.user.phone || !this.user.phone.match(phoneRegex)) {
//       this.hasError = true;
//       this.phoneClass = 'hasError';
//       this.phonePlaceholder = this.phoneError;
//     } else {
//       this.phoneClass = '';
//     }
//   }

//   validateEmail() {
//     if (!this.user.email.includes('@')) {
//       this.hasError = true;
//       this.emailClass = 'hasError';
//       this.emailPlaceholder = this.emailError;
//     } else {
//       this.emailClass = '';
//     }
//   }
// }
// customElements.define('create-user', CreateUser);
// export default CreateUser;