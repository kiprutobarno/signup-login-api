const create = (email, password) => {
  return `INSERT INTO users(email, password, dateCreated) VALUES('${email}', '${password}', current_timestamp)`;
};

const read = () => {
  return `SELECT * FROM users`;
};

const remove = (email) => {
  return `DELETE FROM users WHERE email='${email}'`;
};

export { create, read, remove };
