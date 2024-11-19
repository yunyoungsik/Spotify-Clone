import { User } from '../models/user.model.js';

export const getAllUsers = async (req, res, next) => {
  try {
    // 현재 사용자의 ID를 가져옴 (인증된 사용자 정보에서 userId를 추출)
    const currentUserId = req.auth.userId;
    // 현재 사용자의 ID와 다른 사용자를 검색
    // User 컬렉션에서 clerkId가 현재 사용자 ID와 같지 않은 문서들을 찾음
    const users = await User.find({ clerkId: { $ne: currentUserId } });

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
