import { Router } from 'express';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';
import { getAllsongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from '../controller/song.controller.js';

const router = Router();

router.get('/', protectRoute, requireAdmin, getAllsongs);
router.get('/featured', getFeaturedSongs)
router.get('/made-for-you', getMadeForYouSongs)
router.get('/trending', getTrendingSongs)

export default router;
