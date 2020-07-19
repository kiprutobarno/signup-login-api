import { Router } from 'express';
import {
  createUser,
  deleteUser,
  displayUsers,
  login,
  logout,
  updatePassword,
  forgotPassword
} from './controllers/userController';
import { authMiddleware } from './middleware/auth';

const router = Router();
router.post('/auth/register', createUser);
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.post('/auth/forgot/:email', forgotPassword);
router.put('auth/passwordUpdate/:email', authMiddleware, updatePassword);
router.get('/users', authMiddleware, displayUsers);
router.delete('/users/:email', deleteUser);

export default router;
