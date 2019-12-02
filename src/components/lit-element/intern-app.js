import { LitElement, html, css } from 'lit-element';
import './user-profile';
import './user-list';
import './create-user';
import './edit-user';
import { FirebaseAPI } from '@app/api/firebaseAPI.js';
import * as firebase from "firebase/app";
import "firebase/database";
import routeTree from '@app/routing/routes.js';
const router = require('node_modules/@banno/web-component-router');
const RouteMixin = require('node_modules/@banno/web-component-router/routing-mixin');
import { PropertyEffects } from 'node_modules/@banno/polymer/lib/mixins/property-effects.js';

var firebaseConfig = {
  apiKey: "",
  authDomain: "onboarding-project-d1154.firebaseapp.com",
  databaseURL: "https://onboarding-project-d1154.firebaseio.com",
  projectId: "onboarding-project-d1154",
  storageBucket: "onboarding-project-d1154.appspot.com",
  messagingSenderId: "461134238683",
  appId: "1:461134238683:web:629a864bdaf08301"
};

firebase.initializeApp(firebaseConfig);

const storage = new FirebaseAPI();

class InternApp extends RouteMixin(PropertyEffects(LitElement)) {
  static get styles() {
    return css`
      header {
        width: 100%;
        padding: 20px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .userListContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 80%;
        overflow: scroll;
      }

      h1 {
        font-weight: normal;
      }

      p {
        font-weight: lighter;
        display: inline-block;
      }

      span {
        font-family: monospace;
        font-size: 15px;
      }

      .routingContainer {
        display: flex;
        flex-direction: row;
        overflow: scroll;
      }

      /* Nav Bar Styles */
      body {
        margin: 0;
      }

      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #6495ED;
        position: fixed;
        top: 0;
        width: 100%;
        display: inline-flex;
        flex-direction: row;
        justify-content: space-around;
      }

      li {
        font-size: 20px;
      }

      li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
      }

      li a:hover:not(.active) {
        background-color: #111;
      }

      .active {
        background-color: rgb(159, 209, 255);
      }

      * {
        font-family: "Helvetica", Times, serif;
      }

      .centered {
        text-align: center;
      }
    `;
  }

  static get properties() {
    return {
      storage: { type: Object },
      users: { type: Object }
    }
  }

  constructor() {
    super();
    this.storage = storage;
    this.users = storage.getAllUsers();
  }

  render() {
    return /**/html`
      <header>
        <ul>
          <li>
            <a href="/create-user">Create User</a>
          </li>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </header>
      <div class="routingContainer">
        <user-list
          .users="${this.users}"
          .storage="${this.storage}">
        </user-list>
      </div>
      <slot></slot>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('Storage at Intern-App', this.storage);
    router.routeTree = routeTree;
    router.routeTree.getValue().element = this;
    router.start();
    this.loadUsers();
    this.addEventListener('updateUserList', this.updateUserList);
  }

  updateUserList() {
    this.users = storage.getAllUsers();
  }

  async loadUsers() {
    const database = firebase.database();
    const ref = await database.ref('users');
    this.users = await ref.on('value', storage.getData.bind(this));
  }
}
customElements.define('intern-app', InternApp);
export default InternApp;