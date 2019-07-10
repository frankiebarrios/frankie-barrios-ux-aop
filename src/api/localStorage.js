export class LocalStorage {
  constructor(_id, firstName) {
    this._id = _id;
    this.firstName = firstName
  }
  
  createUser(user) {
    localStorage.setItem('User', JSON.stringify(user));
    let userData = JSON.parse(localStorage.getItem('User'));
    let localUser = JSON.parse(localStorage.getItem('User'));

    if (user._id == userData._id) {
      this.deleteUser(localUser._id);
      user._id = this.generateId();
      localStorage.setItem('User', JSON.stringify(user));
    }
    console.log('createUser() -> User Added: ', localUser);
  }

  getUser(id) {
    let user = JSON.parse(localStorage.getItem('User'));

    if (user._id == id) {
      console.log('getUser() -> User Found: ', user);
    } else
      console.log('No User Found, Try Again');
  }

  getAllUsers() {
    console.log('getAllUsers() -> Users Found: ', JSON.parse(localStorage.getItem('User')));
  }

  updateUser(id, newDataToUpdate) {
    // Takes two arguments:

    // User ID string to find a user
    // object data to update
    // Updates the first matching object in storage with the provided data. If a value has already been set and is not overwritten by the new data, it will remain intact. If a key has not already been defined, it will now be defined.

    // Returns the newly updated object in its entirety. If no object could be found, an empty object is returned.

    // storage.updateUser(
    //   '59825',
    //   { department: 'HR' }
    // )
    // Updates the first object to match the query (id value of '59825')
    // with the values provided (department: 'HR').
    // If the value has not already been set, it is assigned.
    // The newly updated object is returned.
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