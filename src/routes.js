import { Router } from 'express';
import createUser from './controllers/userController';

const routes = Router();
routes.post('/users', createUser);

export default routes;
