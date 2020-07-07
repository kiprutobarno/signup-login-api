import db from "../utils/db";
import { create, read, remove } from "../models/userModel";

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let data = await db.query(create(email, password));
    if (data) {
      res.status(201).send({ message: "Created" });
    }
  } catch (error) {}
};

const displayUsers = async (req, res) => {
    try {
      let { rows } = await db.query(read());
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
  try {
    let data = await db.query(remove(email));
    if (data) {
      res.status(200).send({ message: "Deleted" });
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export { createUser, deleteUser, displayUsers };
