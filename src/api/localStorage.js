// Need to export as a JS Module and import it into user-profile
class LocalStorage {

    //localStorage Object
    // userAccounts = {
    //     _id: String,
    //     firstName: String,
    //     lastName: String,
    //     phone: String,
    //     email: String
    // }
    // [] indicates a property is a hidden field not shown in the user profile.
    // Need to link .js file successfully to be used withing components and build/ test eaach function 
    // and not move on until tests successfully.

    testFunction() {
        alert('Test Function Hit');
    }

    createUser(user) {
        // Takes one argument, an object.

        // Adds a single object to storage, regardless of content.
        
        // Every object is required to have the property _id. If an object is added to storage without this property, it will create an _id. If the provided _id already exists in storage, it will fail to add the object.
        
        // If successful, returns the newly created object (including the _id). If failed, returns a string along the lines of 'insert attempt failed.'
        
        // storage.createUser({
        //   name: 'Name',
        // });
        // Adds an object to storage with the property 'name' and returns the newly created object.
    }

    getUser(id) {
        // Takes one argument: a user ID string to search on.

        // Returns the first matching result in its entirety. If there are no matching results, returns an empty object.
        
        // storage.getUser('59825');
        // Returns the first object to match the query (_id value of '59825')
    }

    getUsers() {
        // Takes no arguments. Returns the full user list.

        // storage.getUsers();
        // Returns the users list
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
        // Takes one argument. Can either be a filter on which to search or an _id string.

        // Removes the first matching object from storage. If there is no matching object, none will be removed.
        
        // Returns the newly deleted object. If nothing is deleted, an empty object is returned.
        
        // storage.deleteUser('59825');
        // Deletes the first object to match the query
        // and returns the just-deleted object
    }

    deleteUsers() {
        //Takes no arguments. Deletes all objects
        //from the users list and returns the users list.
        //Usage Example:
        //storage.deleteUsers();
        // Deletes all entries in the users list
        // and returns the users list

    }

    generateId() {
        // Generates a unique ID value to assign to an object.
        // Returns the generated ID string.
    }

    validateUser(id) {
        // A private function that takes one argument,
        // a User object. Returns a boolean. true if 
        // the input matches the user model criteria,
        // false if it does not.
    }

}

export default LocalStorage;