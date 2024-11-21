import { Router } from 'express';
import { protecteRoute, requireAdmin } from '../middleware/auth.middleware.js';
import { getStats } from '../controller/stat.controller.js';

const router = Router();

router.get('/', protecteRoute, requireAdmin, getStats);

export default router;
