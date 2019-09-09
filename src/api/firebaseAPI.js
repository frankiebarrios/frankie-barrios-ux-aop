import * as firebase from 'firebase/app'
import 'firebase/database'

export class FirebaseAPI {
  constructor () {
    this.users = [];
  }

  createUser (user) {
    firebase
      .database()
      .ref('users/')
      .push({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        id: this.generateId()
      });
  }

  generateId () {
    return Math.floor(10000 + Math.random() * 9000);
  }

  getUserIndex (id) {
    return this.users.findIndex(user => user.id === id);
  }

  updateUser (id, update) {
    try {
      const updatedUser = Object.assign(this.getUser(id), update);
      this.users.splice(this.getUserIndex(id), 1, updatedUser);
      this.syncData(update);
    } catch (err) {
      console.error('Error Editing User: ', err);
    }
  }

  syncData (user) {
    this.createUser(user);
    this.deleteUser(user.id);
  }

  deleteAllUsers () {
    firebase
      .database()
      .ref('/')
      .remove();
  }

  getAllUsers () {
    const database = firebase.database();
    const ref = database.ref('users');
    ref.on('value', this.getData.bind(this));
    return this.users;
  }

  getData (data) {
    try {
      const firebaseData = data.val();
      const keys = Object.keys(firebaseData);
      const userObj = [];
      keys.forEach(key => { userObj.push(firebaseData[key]) });
      this.users = userObj;
    } catch (error) {
      console.error('Error Pulling In Users: Database Empty ', error);
    }
  }

  deleteUser (id) {
    const user = this.getUser(id);
    const ref = firebase.database().ref('users');
    let match = '';
    try {
      ref
        .orderByChild('id')
        .equalTo(user.id)
        .on('child_added', function (snapshot) {
          match = snapshot.key
      });
    } catch (error) {
      console.error('Error Finding Match: ', error);
    }
    firebase
      .database()
      .ref('users/' + match)
      .remove();
  }

  getUser (id) {
    return this.users.find(user => String(user.id) === String(id));
  }
}
