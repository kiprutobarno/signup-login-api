import { Router } from "express";
import {
  createUser,
  deleteUser,
  displayUsers,
} from "./controllers/userController";

const routes = Router();
routes.post("/users", createUser);
routes.delete("/users/:email", deleteUser);
routes.get("/users", displayUsers);

export default routes;
