import { LikeType } from '../enums';

export interface ILikeRepository {
  likeOrDislike(
    userId: string,
    contentId: string,
    likeType: LikeType,
  ): Promise<boolean>;
}
