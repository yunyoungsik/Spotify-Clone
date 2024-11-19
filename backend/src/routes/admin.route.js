import { Router } from 'express';
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from '../controller/admin.controller.js';
import { protecteRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protecteRoute, requireAdmin);

router.get('/check', checkAdmin);

router.post('/songs', createSong);
router.delete('/songs/:id', deleteSong);

router.post('/albums', createAlbum);
router.delete('/albums', deleteAlbum);

export default router;
