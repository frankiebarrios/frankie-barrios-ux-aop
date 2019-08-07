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

  updateUser(id, update) {
    try {
      const updatedUser = Object.assign(this.getUser(id), update);
      this.users.splice(
        this.users.findIndex(
          user => String(user.id) === id), 1, updatedUser);
      this.syncStorage();
    } catch (err) {
      console.error('Error Editing User: ', err);
    }
  }

  // updateUser(id, update) {
  //   try {
  //     const updatedUser = Object.assign(this.getUser(id), update);
  //     this.users.splice(
  //       this.users.findIndex(
  //         user => String(user.id) === id), 1, updatedUser);
  //     this.syncStorage();
  //   } catch (err) {
  //     console.error('Error Editing User: ', err);
  //   }
  // }

  deleteUser(id) {
    const userIndex = this.users.findIndex(user => String(user.id) === id);
    this.users.splice(userIndex, 1);
    this.syncStorage();
  }

  deleteAllUsers() {
    this.users = [];
    localStorage.clear();
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
    return !Boolean(
      userObject.find(prop => userProps[prop] !== testProps[prop]));
  }
}
