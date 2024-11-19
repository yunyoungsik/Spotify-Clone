import { Song } from '../models/song.model.js';

export const getAllsongs = async (req, res, next) => {
  try {
    // -1 = Descending => newest -> oldest
    // 1 = Ascending => oldest -> newest
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    // MongoDB의 집계 파이프라인을 사용하여 6개의 랜덤한 노래를 가져옴
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
        // $sample: 컬렉션에서 지정한 수(size)의 문서를 무작위로 선택
        // 이 경우, 데이터베이스에서 6개의 랜덤 문서를 가져옴
      },
      {
        // $project: 출력되는 문서의 필드를 지정하거나 제외하는 데 사용
        $project: {
          _id: 1, // _id 필드를 포함 (1은 포함, 0은 제외를 의미)
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    next(error);
  }
};
