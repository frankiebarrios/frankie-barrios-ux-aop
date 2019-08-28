import * as firebase from "firebase/app";
import "firebase/database";

export class FirebaseAPI {
  constructor() {
    this.users = [];
  }

  createUser(user) {
    firebase.database().ref('users/').push({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email, 
      id: this.generateId()
    });
  }

  generateId () {
    return Math.floor(10000 + Math.random() * 9000)
  }

  getUserIndex (id) {
    return this.users.findIndex(user => user.id === id)
  }

  updateUser(id, update) {
    try {
      const updatedUser = Object.assign(this.getUser(id), update)
      this.users.splice(this.getUserIndex(id), 1, updatedUser)
      this.syncData(update);
      //this.deleteUser(id);
    } catch (err) {
      console.error('Error Editing User: ', err)
    }  
  }

  syncData(user) {
    this.createUser(user);
    //this.deleteUser(user.id);
  }
  // TODO: somewhat working, deletes all data from FBDB
  // But once component is connected, causes error when 
  // getAllUsers() tries to pull data into state on load/ connect.
  deleteAllUsers() {
    firebase.database().ref('/').remove();
  }

  getAllUsers() {
    const database = firebase.database();
    const ref= database.ref('users');
    ref.on('value', this.getData.bind(this));
    return this.users;
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
    this.users = userObj;
  }

  deleteUser(id) {
    //this.users.splice(this.getUserIndex(id), 1)
    firebase.database().ref('users/', this.getUser(id)).remove();
  }

  getUser(id) {
    return this.users.find(user => String(user.id) === String(id))
  }
}