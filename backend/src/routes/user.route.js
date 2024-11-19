import { Router } from 'express';
import { protecteRoute } from '../middleware/auth.middleware.js';
import { getAllUsers } from '../controller/user.controller.js';

const router = Router();

router.get('/', protecteRoute, getAllUsers);
// todo: getMessages

export default router;
