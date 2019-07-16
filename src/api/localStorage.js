import Enumerable from '../../node_modules/linq';
import faker from '../../node_modules/faker';
export class LocalStorage {
  constructor(_id) {
    this._id = _id;
  }

  createUser() {
    let existingUsers = JSON.parse(localStorage.getItem('userAccounts'));
    if (existingUsers === null) existingUsers = [];
    this._id = Math.floor(10000 + Math.random() * 9000);
    let userName = faker.fake('{{name.firstName}} {{name.lastName}}');

    let userEntry = {
      '_id': this._id,
      'name': userName
    };
    
    existingUsers.push(userEntry); 
    localStorage.setItem('userAccounts', JSON.stringify(existingUsers));
    console.log('createUser() -> User Added: ', userEntry);
  }
  
  getUser(id) {
    let users = JSON.parse(localStorage.getItem('userAccounts'));

    let user = Enumerable
      .from(users)
      .where((u) => u._id == this._id)
      .firstOrDefault();

    console.log('getUser() -> User Found: ', user);
    return user;
  }

  getAllUsers() {
    console.log('getAllUsers() -> Users Found: ',
     JSON.parse(localStorage.getItem('userAccounts')));
    return JSON.parse(localStorage.getItem('userAccounts'));
  }

  updateUser(id, update) {
    let existingUsers = JSON.parse(localStorage.getItem('userAccounts'));
    for (let i = 0; i < existingUsers.length; i++) {
      if (existingUsers[i]._id === this._id) {
        const updatedUser = Object.assign(existingUsers[i], update);
        console.log('updateUser() -> Updated User: ', updatedUser);
      }
    }
  }

  replaceUser(id, update) {
    let users = JSON.parse(localStorage.getItem('userAccounts'));
    const index = users.indexOf(users.find(user => user._id === id));
    Object.assign(users[index], update);
  }

  deleteUser(id) {
    id = this._id;
    let users = JSON.parse(localStorage.getItem('userAccounts'));
    for (let i = 0; i < users.length; i++) {
      if (users[i]._id === id) {
        let userToDelete = localStorage.key(i);
        localStorage.removeItem(`'${userToDelete}'`);
        console.log("deleteUser() -> Delete User: ", users[i]);
        console.log('To delete all users, click "Delete All Users" button.');
        console.log('To add new users, click "Create User" button.');
      }
    }
  }

  deleteAllUsers() {
    localStorage.clear();
    console.log('deleteAllUsers() -> All localStorage Data Destroyed!: ',
    JSON.parse(localStorage.getItem('userAccounts')));
  }

  generateId() {
    console.log('generateId() -> ID Generated: ',
     Math.floor((Math.random() * 1000) + 1));
    return Math.floor((Math.random() * 1000) + 1);
  }

  validateUser(user) {
    const validationObject = {
      _id: String,
      name: String
    }
    const userObject = Object.getOwnPropertyNames(user);
    const testObject = Object.getOwnPropertyNames(validationObject);
    if (userObject.length != testObject.length) {
      console.log('Number Of Props Do Not Match, User Invalid');
      return false;
    }

    for (let i = 0; i < userObject.length; i++) {
      let propNames = userObject[i];
      if (userObject[propNames] !== testObject[propNames]) {
        console.log('Prop Names Do Not Match, User Invalid');
        return false;
      }
    }
    console.log('validateUser() -> Results: User Valid');
    return true;
  }
    
}