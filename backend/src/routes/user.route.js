import { Router } from 'express';
import { getAdmin } from '../controller/admin.controller.js';

const router = Router();

router.get('/like', (req, res) => {
  req.auth.userId
  res.send("User")
});

export default router;
