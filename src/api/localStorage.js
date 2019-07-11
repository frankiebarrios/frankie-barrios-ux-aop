import Enumerable from '../../node_modules/linq';
export class LocalStorage {
  constructor(_id, firstName, users) {
    this._id = _id;
    this.firstName = firstName;
  }

  createUser() {
    let existingUsers = JSON.parse(localStorage.getItem('userAccounts'));
    if (existingUsers == null) existingUsers = [];
    this._id = Math.floor((Math.random() * 1000) + 1);
    let userName = 'Test Name';
    let userEntry = {
      '_id': this._id,
      'name': userName
    };
    localStorage.setItem('User', JSON.stringify(userEntry));
    existingUsers.push(userEntry); 
    localStorage.setItem('userAccounts', JSON.stringify(existingUsers));
    console.log('createUser() -> User Added: ', userEntry);
  }
  
  getUser(id) {
    id = this._id;
    let users = JSON.parse(localStorage.getItem('userAccounts'));
    let user = Enumerable
      .from(users)
      .where((u) => u._id == id)
      .firstOrDefault();
    console.log('getUser() -> User Found: ', user);
    return user;
  }

  getAllUsers() {
    console.log('getAllUsers() -> Users Found: ', JSON.parse(localStorage.getItem('userAccounts')));
    return JSON.parse(localStorage.getItem('userAccounts'));
  }

  updateUser(id, update) {
    let existingUsers = JSON.parse(localStorage.getItem('userAccounts'));
    console.log('updateUser() User Accounts: ', existingUsers);
    for (let i = 0; i < existingUsers.length; i++) {
      if (existingUsers[i]._id == id) {
        localStorage.setItem(update); // Need to hardcode an ._id to pass into the function call for testing 
                                      // To do this, will add an object to the array from the beginning 
                                      // of this function with hardcoced props that I can pass in to find the match
      }
    }
  }

  replaceUser(id, newUser) {
    // Takes two arguments:

    // User ID string
    // object data to replace old object with
    // Removes all object data except User ID and replaces it with the new object data.

    // Returns the newly defined object.

    // storage.replaceOne(
    //   '59825' ,
    //   { department: 'HR' }
    // );
    // Very similar to updateOne() except that any fields not provided in
    // the argument are removed from existing user object.
  }

  deleteUser(id) {
    let user = JSON.parse(localStorage.getItem('User'));

    // Check based on an individual user being in localStorage
    // Will have to loop through localStorage if multiple users
    if (user._id == id) {
      localStorage.removeItem('User');
    }

    let localData = JSON.parse(localStorage.getItem('User'));
    console.log('deleteUser() -> User Deleted: ', localData);
  }

  deleteAllUsers() {
    localStorage.clear();
    console.log('deleteAllUsers() -> All localStorage Data Destroyed!: ', JSON.parse(localStorage.getItem('User')));
  }

  generateId() {
    console.log('generateId() -> ID Generated: ', Math.floor((Math.random() * 1000) + 1));
    return Math.floor((Math.random() * 1000) + 1);
  }

  validateUser(id) {
    // A private function that takes one argument,
    // a User object. Returns a boolean. true if 
    // the input matches the user model criteria,
    // false if it does not.
  }
}