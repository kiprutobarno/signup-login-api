import db from '../utils/db';
import {
  create, read, remove, search
} from '../models/userModel';
import { isBlank, isEmailValid } from '../utils/validator';
import { encrypt, decrypt, generateJwtToken } from '../middleware/auth';

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (isBlank(email) || isBlank(password)) {
      res.status(400).send({ error: "There's a blank field" });
    }
    if (!isEmailValid(email)) {
      res.status(400).send({ error: 'Invalid email address' });
    } else {
      await db.query(create(email, encrypt(password)));
      res.status(201).send({ message: 'User created' });
    }
  } catch (error) {
    const { routine } = error;
    if (routine === '_bt_check_unique') {
      res.status(400).send({ error: 'That email is already registered' });
    }
  }
};

const displayUsers = async (req, res) => {
  try {
    const { rows } = await db.query(read());
    if (rows.length > 0) {
      res.status(200).send(rows);
    } else {
      res.status(200).send({ message: 'No user is currently registered' });
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
      res.status(400).send({ error: 'Please provide user email' });
    }
    if (rows.length === 0) {
      res.status(400).send({ error: 'That email is not registered' });
    } else {
      await db.query(remove(email));
      res.status(200).send({ message: 'User deleted' });
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
      res.status(400).send({ error: "There's a blank field" });
    }
    if (rows.length === 0) {
      res.status(400).send({ error: 'That email is not registered' });
    } else if (!decrypt(password, user.password)) {
      res.status(401).send({ error: 'Wrong password' });
    } else {
      const token = generateJwtToken(user);
      res.status(200).send({ message: 'Login successful!', token });
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export {
  createUser, deleteUser, displayUsers, login
};
