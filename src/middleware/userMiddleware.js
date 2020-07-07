import bcrypt from "bcrypt";

const encrypt = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const decrypt = (password, encryptedPassword) => {
  return bcrypt.compareSync(password, encryptedPassword);
};

export { encrypt, decrypt };
