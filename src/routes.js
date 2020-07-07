import { Router } from "express";
import { createUser, deleteUser } from "./controllers/userController";

const routes = Router();
routes.post("/users", createUser);
routes.delete("/users/:email", deleteUser);

export default routes;
