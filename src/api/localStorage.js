export class LocalStorage {
  constructor(_id, firstName) {
    this._id = _id;
    this.firstName = firstName
  }

  createUser(user) {
    localStorage.setItem('User', JSON.stringify(user));
    let localData = JSON.parse(localStorage.getItem('User'));

    if (localData._id == undefined || null || '') {
        localStorage.setItem('User._id',
            localData._id = Math.floor((Math.random() * 1000) + 1));
    } else if (localData._id == JSON.parse(localStorage.getItem('_id'))) {
        console.log('User Already Exists, Try Again');
        return -1;
    }
    console.log('User Added: ', localData);
  }

  getUser(id) {
    let user = localStorage.getItem('User._id', id);
    if (user) {
        console.log('User Found: ', localStorage.getItem('User'));  
    } else 
        console.log('No User Found, Try Again');
  }

  getUsers() {
    return JSON.parse(localStorage.getItem('User'));
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
    localStorage.removeItem(id);
    let localData = JSON.parse(localStorage.getItem('User'));
    return localData;
  }

  deleteUsers() {
    localStorage.clear();
    return JSON.parse(localStorage.getItem('User'));
  }

  generateId() {
    return Math.floor((Math.random() * 1000) + 1);
  }

  validateUser(id) {
      // A private function that takes one argument,
      // a User object. Returns a boolean. true if 
      // the input matches the user model criteria,
      // false if it does not.
  }
}

    
