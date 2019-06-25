// if using images, might be better to pass as a separate param
class User {
  constructor({ name, password, email }, image) {
    this.name = name;
    this.password = password;
    this.email = email;
    this.image = image;
  }
}

module.exports = User;
