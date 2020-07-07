import db from '../utils/db';
import User from '../models/userModel';

const user = new User();

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = db.query(user.create(email, password));
    if (data) {
      res.status(201).send({ message: 'Created' });
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export default createUser;
