const create = (email, password) => `INSERT INTO users(email, password, date_created) VALUES('${email}', '${password}', localtimestamp)`;

const read = () => 'SELECT * FROM users';

const remove = (email) => `DELETE FROM users WHERE email='${email}'`;

const search = (email) => `SELECT * FROM users WHERE email='${email}'`;

const searchToken = (token) => `SELECT * FROM users WHERE password_reset_token='${token}'`;

const updateToken = (email, token, expiry) => `UPDATE users SET password_reset_token='${token}', password_reset_token_expiry='${expiry}' WHERE email='${email}'`;

const updatePassword = (email, password, expiry) => `UPDATE users SET password='${password}', password_reset_token_expiry='${expiry}' WHERE email='${email}'`;

export {
  create,
  read,
  remove,
  search,
  searchToken,
  updateToken,
  updatePassword
};
