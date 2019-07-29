export class LocalStorage {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('UserAccounts')) || [];
  }

  createUser(user) {
    user.id = this.generateId();
    this.users.push(user);
    this.syncStorage();
  }

  syncStorage() {
    localStorage.setItem('UserAccounts', JSON.stringify(this.users));
    this.updateUsers();
  }

  updateUsers() {
    this.users = JSON.parse(localStorage.getItem('UserAccounts')) || [];
  }

  getUser(id) {
    const user = this.users.find(user => String(user.id) === String(id));
    return user;
  }

  getAllUsers() {
    return this.users;
  }

  editUser(id, editName, editValue) {
    try {
      const editObj = {};
      editObj[`${editName}`] = `${editValue}`;
      const updatedUser = Object.assign(this.getUser(id), editObj);
      this.deleteUser(id);
      this.createUser(updatedUser);
    } catch (err) { console.error('Error Editing User: ', err); }
  }

  deleteUser(id) {
    this.updateUsers();
    this.users.forEach((user, index) => {
      if (String(user.id) === String(id)) {
        this.users.splice(index, 1);
        this.syncStorage();
      }
    });
  }

  deleteAllUsers() {
    this.users = [];
    localStorage.clear();
  }

  generateId() {
    return Math.floor((Math.random() * 1000) + 1);
  }

  validateUser(user) {
    const validationObject = {
      _id: String,
      name: String
    }
    const userProps = Object.getOwnPropertyNames(user);
    const testProps = Object.getOwnPropertyNames(validationObject);
    if (userProps.length !== testProps.length) {
      console.log('Number Of Props Do Not Match, User Invalid');
      return false;
    }
    for (let i = 0; i < userProps.length; i++) {
      let propNames = userProps[i];
      if (userProps[propNames] !== testProps[propNames]) {
        console.log('Prop Names Do Not Match, User Invalid');
        return false;
      }
    }
    return true;
  }

  getUserIndex(id) {
    try {
      const index = this.users.indexOf(this.users.find(user => user.id.toString() === id.toString()));
      return index;
    } catch (err) {
      console.error('Error Finding Index: ', err);
    }
  }

}
