import { Router } from 'express';

const router = Router();

router.post('/callback', async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
  } catch (error) {}
});

export default router;
