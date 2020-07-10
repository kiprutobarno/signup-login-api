import { Router } from 'express';
import {
  createUser,
  deleteUser,
  displayUsers,
  login, logout, updatePassword
} from './controllers/userController';
import { authMiddleware } from './middleware/auth';

const routes = Router();
routes.post('/auth/register', createUser);
routes.post('/auth/login', login);
routes.post('/auth/logout', logout);
routes.put('auth/passwordUpdate/:email', authMiddleware, updatePassword);
routes.get('/users', authMiddleware, displayUsers);
routes.delete('/users/:email', deleteUser);

export default routes;
