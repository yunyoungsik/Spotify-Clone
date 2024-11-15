import { Router } from 'express';
import { createSong } from '../controller/admin.controller';
import { protecteRoute, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/songs', protecteRoute, requireAdmin, createSong);

export default router;
