import * as firebase from "firebase/app";
import "firebase/database";

export class LocalStorage {
  constructor() {
    this.users = JSON.parse(
      localStorage.getItem('UserAccounts')) || [];
  }

  createUser(test) {
    //this.user.id = this.generateId();
    firebase.database().ref('users/').push({test});
    // this.users.push(user);
    // this.syncStorage();
  }

  // May not need this since I'm working with DB now???
  syncStorage() {
    // This will change to push all data to FB DB vs LS
    localStorage.setItem('UserAccounts', JSON.stringify(this.users));
    // This will change to pull in all of FB DB Data vs LS Data
    this.users = JSON.parse(localStorage.getItem('UserAccounts')) || [];
  }

  getUser(id) {
    // Need to find way to attain userid from FB DB since it will 
    // be generating them for me automatically
    return this.users.find(user => String(user.id) === String(id));
  }

  // getAllUsers() {
  //   // console.log('this.users: ', this.users);
  //   return this.users;
  // }

  getAllUsers() {
    const database = firebase.database();
    const ref= database.ref('users');
    ref.on('value', this.getData); 
  }

  getData(data) {
   const firebaseData = data.val();
   const keys = Object.keys(firebaseData);
   const userObj = [];    
   for(let i = 0; i < keys.length; i++) {
     let key = keys[i];
     let user = firebaseData[key];
     userObj.push(user);
   }
   console.log('Users Object:', userObj);
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
    // Need to see how data comes in from FB DB to decide
    // how to iterate through it
    return this.users.findIndex(user => user.id === id);;
  }

  deleteAllUsers() {
    // Need to find way to clear all data from FB DB in one call
    localStorage.clear();
    this.users = [];
  }

  generateId() {
    // Will get rid of soon
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

  getFirebaseUser() {
    return firebase.database().ref('/users/' + userId);
  }
}
