import { LikeType } from '../usecases';

export class Like {
  id: string;

  userId: string;

  contentId: string;

  likeType: LikeType;
}
