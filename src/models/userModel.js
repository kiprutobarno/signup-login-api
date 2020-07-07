class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  create(email, password) {
    this.email = email;
    this.password = password;
    return `INSERT INTO users(email, password, dateCreated) VALUES('${this.email}', '${this.password}', current_timestamp)`;
  }
}

export default User;
