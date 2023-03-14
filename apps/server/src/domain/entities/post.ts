import { Timestamps } from './timestamps';

import { User } from './user';

export class Post extends Timestamps {
  id: string;

  userId: string;

  user: User;

  content: string;

  likeCount: number;

  commentaryCount: number;
}
