export class LocalStorage {
  constructor () {
    this.users = JSON.parse(localStorage.getItem('UserAccounts')) || []
  }

  createUser (user) {
    user.id = this.generateId()
    this.users.push(user)
    this.syncStorage()
  }

  updateUser (id, update) {
    try {
      const updatedUser = Object.assign(this.getUser(id), update)
      this.users.splice(this.getUserIndex(id), 1, updatedUser)
      this.syncStorage()
    } catch (err) {
      console.error('Error Editing User: ', err)
    }
  }

  syncStorage () {
    localStorage.setItem('UserAccounts', JSON.stringify(this.users))
    this.users = JSON.parse(localStorage.getItem('UserAccounts')) || []
  }

  getUser (id) {
    return this.users.find(user => String(user.id) === String(id))
  }

  getAllUsers () {
    console.log('Users: ', this.users)
    return this.users
  }

  deleteUser (id) {
    this.users.splice(this.getUserIndex(id), 1)
    this.syncStorage()
  }

  getUserIndex (id) {
    return this.users.findIndex(user => user.id === id)
  }

  deleteAllUsers () {
    localStorage.clear()
    this.users = []
  }

  generateId () {
    return Math.floor(10000 + Math.random() * 9000)
  }

  validateUser (user) {
    const validationObject = {
      _id: String,
      name: String
    }
    const userProps = Object.getOwnPropertyNames(user)
    const testProps = Object.getOwnPropertyNames(validationObject)
    return !userObject.find(prop => userProps[prop] !== testProps[prop])
  }
}
