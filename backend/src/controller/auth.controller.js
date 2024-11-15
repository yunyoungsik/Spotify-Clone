import { User } from '../models/user.model.js';

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    // 사용자가 이미 존재하는지 확인
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      //  signup
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log('Error in auth callback', error);
    next(error);
  }
};