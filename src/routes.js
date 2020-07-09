import { Router } from 'express';
import {
  createUser,
  deleteUser,
  displayUsers,
  login
} from './controllers/userController';
import {authMiddleware} from "./middleware/auth"

const routes = Router();
routes.post('/users/register', createUser);
routes.delete('/users/:email', deleteUser);
routes.get('/users', authMiddleware, displayUsers);
routes.post('/users/login', login);

export default routes;
