import { ILikeRepository } from '../../data/contracts';

import { LikeType } from '../../data/enums';

import { PostgresDataSource } from '../data-sources';

import { LikeEntity } from '../entities';

export class LikeRepository implements ILikeRepository {
  private getLikeRepository() {
    return PostgresDataSource.getRepository(LikeEntity);
  }

  async likeOrDislike(
    userId: string,
    contentId: string,
    likeType: LikeType,
  ): Promise<boolean> {
    const likeRepository = this.getLikeRepository();

    const likeExists = await likeRepository.findOne({
      where: { userId, contentId },
    });

    if (likeExists) {
      await likeRepository.remove(likeExists);
      return false;
    }

    await likeRepository.save({
      userId,
      contentId,
      likeType,
    });

    return true;
  }
}
