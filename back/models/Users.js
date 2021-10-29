const db = require('../config/db');

module.exports = class Users {
  constructor(name, email, password, profilePicture, permissions, joined) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.profilePicture = profilePicture;
    this.permissions = permissions;
    this.joined = joined;
  }

  static find(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }

  static findOne(user) {
    return db.execute('SELECT * FROM users WHERE name = ? OR email = ?', [user.name.toLowerCase(), user.email]);
  }

  static save(user) {
    return db.execute(
      'INSERT INTO users (name, email, password, profilePicture) VALUES (?, ?, ?, ?)',
      [user.name, user.email, user.password, user.profilePicture]
    );
  }
};