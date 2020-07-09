import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const encrypt = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const decrypt = (password, encryptedPassword) => bcrypt.compareSync(password, encryptedPassword);

const generateJwtToken = (user) => {
  const expiresIn = 60 * 60;
  const secret = process.env.SECRET;
  const data = { id: user.userid, email: user.email };
  return jwt.sign(data, secret, { expiresIn });
};
export { encrypt, decrypt, generateJwtToken };
