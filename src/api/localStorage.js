export class LocalStorage {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('UserAccounts')) || [];
  }

  createUser(user) {
    this.updateUsers();
    user.id = this.generateId();
    this.users.push(user);
    localStorage.setItem('UserAccounts', JSON.stringify(this.users));
    console.log('User Added: ', user);
    return this.users;
  } 

  updateUsers() {
    this.users = JSON.parse(localStorage.getItem('UserAccounts')) || [];
    return this.users;
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

  editUser(id, editName, editValue) {
    const editObj = {};
    editObj[`${editName}`] = `${editValue}`;
    const updatedUser = Object.assign(this.getUser(id), editObj);
    console.log('Updated User: ', updatedUser);
    this.createUser(updatedUser);
  }

  replaceUser(id, update) {
    const index = this.getUserIndex(id);
    const replacedUser = Object.assign(
      this.users[index], update);
    console.log('replaceUser() -> Replaced User: ', replacedUser)
    return replacedUser;
  }

  deleteUser(id) {
    this.users.forEach((user, index) => {
      if (user.id === id) {
        this.users.splice(index, 1);
        localStorage.setItem('UserAccounts', JSON.stringify(this.users));
      }
    });
  }

  deleteAllUsers() {
    this.users = [];
    localStorage.clear();
    console.log('deleteAllUsers() -> All localStorage Data Destroyed!: ',
     this.users);
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
    console.log('validateUser() -> Results: User Valid');
    return true;
  }

  findUserMatch(id) {
    try {
      const index = this.getUserIndex(id);
      const user = this.users[index];
      return user;
    } catch (err) {
      console.log('Error Finding User: ', err);
    }
  }

  getUserIndex(id) {
    try {
      const index = this.users.indexOf(this.users.find(user => user.id === id));
      return index;
    } catch (err) {
      console.log('Error Finding Index: ', err);
    }
  }

}
