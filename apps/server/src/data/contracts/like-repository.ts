import { LikeType } from '../../domain/entities';

export interface ILikeRepository {
  likeOrDislike(
    userId: string,
    contentId: string,
    likeType: LikeType,
  ): Promise<boolean>;
}
