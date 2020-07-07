const create = (email, password) => `INSERT INTO users(email, password, dateCreated) VALUES('${email}', '${password}', current_timestamp)`;

const read = () => 'SELECT * FROM users';

const remove = (email) => `DELETE FROM users WHERE email='${email}'`;

const search = (email) => `SELECT * FROM users WHERE email='${email}'`;

export {
  create, read, remove, search
};
