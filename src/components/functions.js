class CreateUser extends PolymerElement {
  static get is() { return 'create-user'; }
  
  static get properties() {
    return {
      user: {
        type: Object,
        value() {
          return {
            firstName: "Test",
            lastName: "User",
            phone: "1",
            email: "@"
  } } } } }

  createUser() {
    console.log('USER:: ', this.user);
    LocalUsers.createUser(this.user);
  }

  getUser() {
    LocalUsers.getUser(userEntry._id);
  }

  getAllUsers() {
    LocalUsers.getAllUsers();
  }

  updateUser() {
    LocalUsers.updateUser(userEntry._id, 
      {'job title': 'Software Engineer'});
  }

  replaceUser() {
    LocalUsers.replaceUser(userEntry._id, {'name': 'New Name'});
  }

  deleteUser() {
    LocalUsers.deleteUser(userEntry._id);
  }

  deleteAllUsers() {
    LocalUsers.deleteAllUsers();
  }

  generateId() {
    LocalUsers.generateId();
  }

  validateUser() {
    LocalUsers.validateUser(
      { _id: String, name: String }
    );
  }

  testLocalStorage() {
    this.createUser();        
    // this.validateUser();
    // this.getUser();
    // this.getAllUsers();
    // this.generateId();
    // this.updateUser();
    // this.replaceUser();
    // this.deleteUser();          
  }
  
  connectedCallback() {
    super.connectedCallback();
    this.testLocalStorage();
  }