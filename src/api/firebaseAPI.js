import * as firebase from "firebase/app";
import "firebase/database";

export class FirebaseAPI {
  constructor() {
    //this.users = (method to get all data from FBDB);
  }

  createUser(user) {
    // Writes new user to FBDB
    // Takes in data from <create-user> form 
    firebase.database().ref('users/').push({user});
  }

  updateUser(id, update) {
    // Replaces an existing user in FBDB
  }

  deleteUser(id) {
    // Deletes existing user from FBDB 
  }

  deleteAllUsers() {
    // Deletes all users in FBDB
  }

  getAllUsers() {
    // Returns all users in FBDB
  }

  getUser(id) {
    // Returns individual user from FBDB
  }
}