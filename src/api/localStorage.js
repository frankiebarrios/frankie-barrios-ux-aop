import * as firebase from "firebase/app";
import "firebase/database";

export class LocalStorage {
  constructor() {
    this.users = JSON.parse(
      localStorage.getItem('UserAccounts')) || [];
  }

  createUser(user) {
    user.id = this.generateId();
    this.users.push(user);
    this.syncStorage();
  }

  syncStorage() {
    localStorage.setItem('UserAccounts', JSON.stringify(this.users));
    this.users = JSON.parse(localStorage.getItem('UserAccounts')) || [];
  }

  getUser(id) {
    return this.users.find(user => String(user.id) === String(id));
  }

  getAllUsers() {
    return this.users;
  }

  updateUser(id, update) {
    try {
      const updatedUser = Object.assign(this.getUser(id), update);
      this.users.splice(this.getUserIndex(id), 1, updatedUser);
      this.syncStorage();
    } catch (err) {
      console.error('Error Editing User: ', err);
    }
  }

  deleteUser(id) {
    this.users.splice(this.getUserIndex(id), 1);
    this.syncStorage();
  }

  getUserIndex(id) {
    return this.users.findIndex(user => user.id === id);;
  }

  deleteAllUsers() {
    localStorage.clear();
    this.users = [];
  }

  generateId() {
    return Math.floor(10000 + Math.random() * 9000);
  }

  validateUser(user) {
    const validationObject = {
      _id: String,
      name: String
    }
    const userProps = Object.getOwnPropertyNames(user);
    const testProps = Object.getOwnPropertyNames(validationObject);
    return !Boolean(userObject.find(prop => userProps[prop] !== testProps[prop]));
  }

  testFirebase() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "",
      authDomain: "onboarding-project-d1154.firebaseapp.com",
      databaseURL: "https://onboarding-project-d1154.firebaseio.com",
      projectId: "onboarding-project-d1154",
      storageBucket: "",
      messagingSenderId: "461134238683",
      appId: "1:461134238683:web:629a864bdaf08301"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Get a reference to the database service
    const database = firebase.database();

    // Create reference for test element in FB DB
    const dbRefObject = firebase.database().ref().child('object');

    // Sync Object Changes
    dbRefObject.on('value', snap => console.log(snap.val()));
  }
}
