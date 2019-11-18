import { LitElement, html, css } from 'lit-element';
import { FirebaseAPI } from '../../api/firebaseAPI';
import * as firebase from "firebase/app";
import "firebase/database";
const Route_Mixin = require('../../../node_modules/@banno/web-component-router/routing-mixin');
const router = require('../../../node_modules/@banno/web-component-router');
import routeTree from '../../routing/routes';
const pageJs = require('page');
import './lit-user-list';

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

class LitInternApp extends Route_Mixin(LitElement) {
  static get styles() {
    return css`
    header {
      width: 100%;
      padding: 20px 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
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
      justify-content: center;
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
    }`;
  }

  static get properties() {
    return {
      storage: {
        value: () => storage
      },
      users: {
        value: () => storage.getAllUsers()
      },
      routeData: {
        type: Object,
        value: routeTree
      }
    }
  }

  render() {
    return /**/html`
      <header>
        <ul>
          <li><a @click=${this.createUsersRoute}>Create New User</a></li>
        </ul>
        <slot></slot>
        <lit-user-list
          .storage=${this.storage}
          .users=${this.users}>
        </lit-user-list>
      </header>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    router.routeTree = routeTree;
    console.log('Lit Route Tree: ', router.routeTree);
    console.log('This: ', this);
    router.routeTree.getValue().element = this;
    router.start();
    this.loadUsers();
  }

  async loadUsers() {
    const database = firebase.database();
    const ref = await database.ref('users');
    this.users = await ref.on('value', storage.getData.bind(this));
  }

  createUsersRoute() {
    console.log('Clicked');
    return '/lit-user-list';
  }
}
customElements.define('lit-intern-app', LitInternApp);
export default LitInternApp;