import * as firebase from "firebase/app";
import "firebase/database";

export class LocalStorage {
  constructor() {
    // Need to change this.users to pull in all of FB DB data vs LS Data
    // Was getting an error stating Firebase wasn't initialized yet when
    // trying to add this directly to the constructor. Need to look at how I am 
    // initializing firebase-app.
    this.users = JSON.parse(
      localStorage.getItem('UserAccounts')) || [];
    // this.users = this.getAllUsers();
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
    // For testing before switching over getAllUser() to this logic
    const database = firebase.database();
    const ref= database.ref('users');
    // Look at if I should be using 'value' here
    // since this will be triggered with my event listeners
    ref.on('value', this.getData); 
  }

  getData(data) {
   const firebaseData = data.val();
   const keys = Object.keys(firebaseData);
   const userObj = {};    
   for(let i = 0; i < keys.length; i++) {
     let key = keys[i];
     //let user = firebaseData[key];
     userObj[key] = firebaseData[key];
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

  getFirebaseUsers() {
    // Get a reference to the database service
    const database = firebase.database();

    // Create reference to test data in FB DB
    const dbRefObject = firebase.database().ref().child('users');

    // Log Data 
    // Wrong call for this but works for now, technically
    // not listening for a value change to trigger this
    // dbRefObject.on('value', snap => console.log(snap.val()));
  }
}
