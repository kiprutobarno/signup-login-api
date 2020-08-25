const create = (email, password, isAdmin) => {
  if (isAdmin === undefined) {
    isAdmin = false;
  }
  return `INSERT INTO users(email, password, date_created, is_admin) VALUES('${email}', '${password}', localtimestamp, '${isAdmin}')`;
};

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
