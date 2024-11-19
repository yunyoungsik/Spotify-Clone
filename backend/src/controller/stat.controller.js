import { Song } from '../models/song.model.js';
import { Album } from '../models/album.model.js';
import { User } from '../models/user.model.js';

export const getStats = async (req, res, next) => {
  try {
    // const totalSongs = await Song.countDocuments();
    // const totalUsers = await User.countDocuments();
    // const totalAlbums = await Album.countDocuments();

    // Promise.all을 사용하여 병렬로 여러 데이터베이스 작업을 처리
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
      // countDocuments: MongoDB의 메서드로, 컬렉션의 문서 개수를 세는 데 사용
      // 예: Song.countDocuments()는 Song 컬렉션에 있는 모든 문서(노래)의 개수를 반환
      Song.countDocuments(),
      Album.countDocuments(),
      User.countDocuments(),

      // aggregate: MongoDB의 집계 프레임워크로, 복잡한 데이터 처리를 단계별로 수행
      // Song.aggregate([...])는 Song 컬렉션의 데이터를 집계 파이프라인에 따라 처리
      Song.aggregate([
        {
          // $unionWith: MongoDB의 집계 연산자로, 두 개의 컬렉션 데이터를 합침
          // coll: 합칠 대상 컬렉션의 이름 (이 경우 'albums' 컬렉션)
          // pipeline: 합치기 전에 추가적으로 적용할 집계 단계 (이 경우 빈 배열로 추가 처리 없음)
          $unionWith: {
            coll: 'albums',
            pipeline: [],
          },
        },
        {
          // $group: MongoDB의 집계 연산자로, 데이터를 특정 필드를 기준으로 그룹화
          // _id: 그룹화 기준 필드를 지정 (이 경우 'artist' 필드)
          // 그룹화 후 동일한 artist를 가진 문서들이 하나의 그룹으로 묶임
          $group: {
            _id: '$artist',
          },
        },
        {
          // $count: MongoDB의 집계 연산자로, 입력 문서의 개수를 계산하여 반환
          // 'count': 결과 필드의 이름으로, 그룹화된 문서 개수를 이 이름으로 반환
          // 예: 그룹화 후 고유한 아티스트의 수를 계산하여 'count' 필드로 반환
          $count: 'count',
        },
      ]),
    ]);

    res.status(200).json({
      totalAlbums,
      totalSongs,
      totalUsers,
      totalArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    next(error);
  }
};
