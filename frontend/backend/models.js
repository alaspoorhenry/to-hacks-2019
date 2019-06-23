// if using images, might be better to pass as a separate param
class User {
  constructor(userData) {
    this.name = userData.name;
    this.password = userData.password;
    this.email = userData.email;
    this.image = userData.image;
  }
}

module.exports = User;
