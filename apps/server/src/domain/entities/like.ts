import { LikeType } from '../enums';

export class Like {
  id: string;

  userId: string;

  contentId: string;

  likeType: LikeType;
}
