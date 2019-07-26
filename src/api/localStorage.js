export class LocalStorage {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('UserAccounts')) || [];
  }

  createUser(user) {
    this.updateUsers();
    user.id = this.generateId();
    this.users.push(user);
    this.setLocalStorageData();
  }

  setLocalStorageData() {
    localStorage.setItem('UserAccounts', JSON.stringify(this.users));
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
    try{
      const editObj = {};
      editObj[`${editName}`] = `${editValue}`;
      const updatedUser = Object.assign(this.getUser(id), editObj);
      this.deleteUser(id);
      this.createUser(updatedUser);
    } catch (err) {console.log('Error Editing User: ', err);}
  }

  replaceUser(id, update) {
    const user = this.users.find(user => String(user.id) === String(id));
    const replacedUser = Object.assign(user, update);
    return replacedUser;
  }

  deleteUser(id) {
    this.updateUsers();
    this.users.forEach((user, index) => {
      if (String(user.id) === String(id)) {
        this.users.splice(index, 1);
        this.setLocalStorageData();
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
    return true;
  }

  getUserIndex(id) {
    try {
      const index = this.users.indexOf(this.users.find(user => user.id.toString() === id.toString()));
      return index;
    } catch (err) {
      console.log('Error Finding Index: ', err);
    }
  }

}
