import faker from '../../node_modules/faker';
export class LocalStorage {
  constructor(_id) {
    this._id = _id;
    this.users = JSON.parse(localStorage.getItem('userAccounts'));
  }

  createUser(user) {
    // Still needs some work...
    if (this.users === null) this.users = [];
    //this.users = this.users ? this.users: [];
    this._id = Math.floor(10000 + Math.random() * 9000);
    let userName = faker.fake('{{name.firstName}} {{name.lastName}}');
    let userEntry = {
      '_id': this._id,
      'name': userName
    };
    this.users.push(userEntry);
    localStorage.setItem('UserAccounts',
      JSON.stringify(this.users));
    console.log('createUser() -> User Added: ', userEntry);
  }

  getUser(id) {
    const user = this.findUserMatch(id);
    console.log('getUser() -> User Found: ', user);
    return user;
  }

  getAllUsers() {
    console.log('getAllUsers() -> Users Found: ', this.users);
    return this.users;
  }

  updateUser(id, update) {
    const index = this.getUserIndex(id);
    const updatedUser = Object.assign(this.users[index], update);
    console.log('updateUser() -> User Updated: ', updatedUser);
  }

  replaceUser(id, update) {
    const index = this.getUserIndex(id);
    const replacedUser = Object.assign(this.users[index], update);
    console.log('replaceUser() -> Replaced User: ', replacedUser)
    return replacedUser;
  }

  deleteUser(id) {
    const index = this.getUserIndex(id);
    console.log('deleteUser() -> User Deleted: ', this.users[index]);
    delete this.users[index];
  }

  deleteAllUsers() {
    localStorage.clear();
    console.log('deleteAllUsers() -> All localStorage Data Destroyed!: ',
     this.users);
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

  findUserMatch(id) {
    const index = this.getUserIndex(id);
    const user = this.users[index];
    return user;
  }

  getUserIndex(id) {
    const index = this.users.indexOf(
      this.users.find(user => this.users._id === id));
    return index;
  }
}
