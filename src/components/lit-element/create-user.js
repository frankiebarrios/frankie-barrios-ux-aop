import { LitElement, html, css } from 'lit-element';
import bindPropertiesFromParentRouteMixin from '@app/routing/bindPropertiesFromParentRouteMixin.js';
const RouteMixin = require('node_modules/@banno/web-component-router/routing-mixin');
import 'node_modules/@banno/jha-design-components/icons/jha-icon-delete-outline.html';
import 'node_modules/@banno/jha-design-components/icons/jha-icon-save-outline.html';
import { PropertyEffects } from 'node_modules/@banno/polymer/lib/mixins/property-effects.js';

class CreateUser extends bindPropertiesFromParentRouteMixin(RouteMixin(PropertyEffects(LitElement))) {
  static get styles() {
    return css`
    :host {
      display: block
    }

    .div-center {
      text-align: center;
    }

    input[type=text],
    select {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border-radius: 4px;
      box-sizing: border-box;
    }

    div {
      border-radius: 5px;
      margin: auto;
      width: 40%;
    }

    .container {
      padding: 10px 16px;
      width: 80%;
    }

    .container::after,
    .row::after {
      content: "";
      clear: both;
      display: table;
    }

    .card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      padding-top: initial;
      margin-top: 65px;
    }

    .icon {
      fill: #6495ED;
      height: 44px;
      width: 44px;
    }

    .formIcons {
      width: 100%;
      display: inline-flex;
      flex-direction: row;
      justify-content: space-around;
      padding-top: 6%;
    }

    .textContainer {
      width: 100%;
      display: inline-flex;
      flex-direction: row;
      justify-content: space-around;
    }

    .hasError {
      border: solid 2px red;
    }

    * {
      font-family: "Helvetica", Times, serif;
    }
    `;
  }

  static get properties() {
    return {
      storage: { type: Object },
      user: { type: Object },
      hasError: { type: Boolean },
      firstNameError: { type: String },
      lastNameError: { type: String },
      phoneError: { type: String },
      emailError: { type: String },
      firstNameClass: { type: String },
      lastNameClass: { type: String },
      phoneClass: { type: String },
      emailClass: { type: String },
      firstNamePlaceholder: { type: String },
      lastNamePlaceholder: { type: String },
      phonePlaceholder: { type: String },
      emailPlaceholder: { type: String }
    };
  }

  constructor() {
    super();
    this.user = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      id: '',
      img: ''
    },
    this.hasError = false,
    this.firstNameError = 'Must Enter A First Name',
    this.lastNameError = 'Must Enter A Last Name',
    this.phoneError = 'Must Enter A Valid Phone Number',
    this.emailError = 'Must Enter A Valid Email Address',
    this.firstNameClass = '',
    this.lastNameClass = '',
    this.phoneClass = '',
    this.emailClass = '',
    this.firstNamePlaceholder = 'Please Enter First Name...',
    this.lastNamePlaceholder = 'Please Enter Last Name...',
    this.phonePlaceholder = 'Please Enter A Valid Phone Number...',
    this.emailPlaceholder = 'Please Enter A Valid Email Address...'
  }

  render() {
    return /**/html`
      <div class="container">
          <h2 class="div-center" style="font-weight: 400;">Create New User</h2>
          <form>
            <label>First Name</label>
            <input type="text" id="firstName" .hasError=${this.hasError} .placeholder="${this.firstNamePlaceholder}"
              .value="${this.user.firstName}" .class=${this.firstNameClass}>

            <label>Last Name</label>
            <input type="text" id="lastName" .hasError=${this.hasError} .placeholder="${this.lastNamePlaceholder}"
              .value="${this.user.lastName}" .class=${this.lastNameClass}>

            <label>Phone</label>
            <input type="text" id="phone" .hasError=${this.hasError} .placeholder="${this.phonePlaceholder}"
            .value="${this.user.phone}" .class=${this.phoneClass}>

            <label>Email</label>
            <input type="text" id="email" .hasError=${this.hasError} .placeholder="${this.emailPlaceholder}"
            .value="${this.user.email}" .class=${this.emailClass}>
          </form>
          <div class="formIcons">
            <jha-icon-delete-outline class="icon" @click=${this.deleteAllUsers}></jha-icon-delete-outline>
            <jha-icon-save-outline class="icon" @click=${this.createUser}></jha-icon-save-outline>
          </div>
          <div class="textContainer">
            <h5>Delete All</h5>
            <h5>Create</h5>
          </div>
      </div>
    `;
  }

  createUser() {
    console.log('Create User Hit');
    console.log('Storage: ', this.storage);
    // this.storage.createUser(this.user);

    // this.validateInput();
    // if (!this.hasError) {
    //   this.storage.createUser(this.user);
    //   this.user = {};
    // }
    // this.hasError = false;
    this.dispatchEvent(new CustomEvent('updateUserList', { bubbles: true, composed: true }));
  }

  deleteAllUsers() {
    alert('Need Safety Check To Avoid Deleting All Data If Triggered');
    //this.storage.deleteAllUsers();
    // By dispatching this event here were triggering any listener functions
    // elsewhere in the app that will update the user list without reloading the page
    //this.dispatchEvent(new CustomEvent('updateUserList', { bubbles: true, composed: true }));
  }

  validateInput() {
    this.validateFirstName();
    this.validateLastName();
    this.validatePhone();
    this.validateEmail();
  }

  validateFirstName() {
    if (!this.user.firstName) {
      this.hasError = true;
      this.firstNameClass = 'hasError';
      this.firstNamePlaceholder = this.firstNameError;
    } else {
      this.firstNameClass = '';
    }
  }

  validateLastName() {
    if (!this.user.lastName) {
      this.hasError = true;
      this.lastNameClass = 'hasError';
      this.lastNamePlaceholder = this.lastNameError;
    } else {
      this.lastNameClass = '';
    }
  }

  validatePhone() {
    const phoneRegex = /^\d{10}$/;
    if (!this.user.phone || !this.user.phone.match(phoneRegex)) {
      this.hasError = true;
      this.phoneClass = 'hasError';
      this.phonePlaceholder = this.phoneError;
    } else {
      this.phoneClass = '';
    }
  }

  validateEmail() {
    if (!this.user.email.includes('@')) {
      this.hasError = true;
      this.emailClass = 'hasError';
      this.emailPlaceholder = this.emailError;
    } else {
      this.emailClass = '';
    }
  }
}
customElements.define('create-user', CreateUser);
export default CreateUser;