import crypto from 'crypto';
import db from '../utils/db';
import {
  create,
  read,
  remove,
  search,
  update,
  updateToken
} from '../models/userModel';
import { isBlank, isEmail } from '../middleware/validator';
import {
  encrypt,
  decrypt,
  generateJwtToken,
  createCookie
} from '../middleware/auth';
import transporter from '../services/mailer';

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (isBlank(email) || isBlank(password)) {
      res.status(400).send({ error: "There's a blank field!" });
    }
    if (!isEmail(email)) {
      res.status(400).send({ error: 'Invalid email address!' });
    } else {
      await db.query(create(email, encrypt(password)));
      res.status(201).send({ message: 'User succesfully created!' });
    }
  } catch (error) {
    const { routine } = error;
    if (routine === '_bt_check_unique') {
      res.status(400).send({ error: 'That email is already registered!' });
    }
  }
};

const displayUsers = async (req, res) => {
  try {
    const { rows } = await db.query(read());
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(200).send({ message: 'No user is currently registered!' });
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.params;
  const { rows } = await db.query(search(email));
  try {
    if (isBlank(email)) {
      res.status(400).send({ error: 'Please provide user email!' });
    }
    if (rows.length === 0) {
      res.status(400).send({ error: 'That email is not registered!' });
    } else {
      await db.query(remove(email));
      res.status(200).send({ message: 'User succefully deleted' });
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { rows } = await db.query(search(email));
  const user = rows[0];
  try {
    if (isBlank(email) || isBlank(password)) {
      res.status(400).send({ error: "There's a blank field!" });
    }
    if (rows.length === 0) {
      res.status(400).send({ error: 'That email is not registered!' });
    } else if (!decrypt(password, user.password)) {
      res.status(401).send({ error: 'Wrong password' });
    } else {
      const generatedData = generateJwtToken(user);
      const { token } = generatedData;
      createCookie(res, generatedData);

      res.status(200).send({ message: 'Login successful!', token });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).send({ status: 200, message: 'Logout successful!' });
};

const updatePassword = async (req, res) => {
  const { email } = req.params;
  const { password } = req.body;

  try {
    if (isBlank(email)) {
      res.status(400).send({ error: 'Please provide user email!' });
    }

    if (!isEmail(email)) {
      res.status(400).send({ error: 'Invalid email address!' });
    }

    const { rows } = await db.query(search(email));

    if (rows.length === 0) {
      res.status(400).send({ error: 'That email is not registered!' });
    } else if (email === rows[0].email) {
      await db.query(update(email, encrypt(password)));
      res.status(200).send({ message: 'Password succesfully updated!' });
    }
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.params;
  const token = crypto.randomBytes(20).toString('hex');
  const { rows } = await db.query(search(email));
  const user = rows[0];
  const expiry = new Date(Date.now() + 14400000).toGMTString();
  await db.query(updateToken(user.email, token, expiry));

  const options = {
    to: 'barxwells@gmail.com',
    from: 'barxwells@gmail.com',
    subject: 'Password Reset',
    text:
      `${
        'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
        + 'Please click on the following link, or paste this into your browser to complete the process:\n\n'
        + 'http://'
      }${req.headers.host}/auth/reset/${token}\n\n`
      + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
  };
  transporter.sendMail(options, (error) => {
    if (error) {
      console.log(error);
    }
  });
  res.status(200).send({ message: 'success' });
};

export {
  createUser,
  deleteUser,
  displayUsers,
  login,
  logout,
  updatePassword,
  forgotPassword
};
