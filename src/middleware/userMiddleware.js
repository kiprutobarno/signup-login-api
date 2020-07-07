import bcrypt from "bcrypt";

const encrypt = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export default encrypt;
