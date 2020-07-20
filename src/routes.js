import { Router } from 'express';
import {
  createUser,
  deleteUser,
  displayUsers,
  login,
  logout,
  resetPassword,
  forgotPassword,
  resetToken
} from './controllers/userController';

const router = Router();
router.post('/auth/register', createUser);
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.post('/auth/forgot/:email', forgotPassword);
router.post('/auth/reset/:token', resetPassword);
router.get('/auth/reset/:token', resetToken);
router.get('/users', displayUsers);
router.delete('/users/:email', deleteUser);

export default router;
