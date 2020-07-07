import db from '../utils/db';
import {
  create, read, remove, search
} from '../models/userModel';
import { isBlank, isEmailValid } from '../utils/validator';

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (isBlank(email) || isBlank(password)) {
      res.status(400).send({ error: "There's a blank field" });
    }
    if (!isEmailValid(email)) {
      res.status(400).send({ error: 'Invalid email address' });
    } else {
      await db.query(create(email, password));
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
    if (rows) {
      res.status(200).send(rows);
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
      res.status(400).send({ error: 'That email not registered' });
    } else {
      await db.query(remove(email));
      res.status(200).send({ message: 'User deleted' });
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export { createUser, deleteUser, displayUsers };
