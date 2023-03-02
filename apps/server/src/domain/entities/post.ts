import { Timestamps } from './timestamps';

export class Post extends Timestamps {
  id: string;

  userId: string;

  content: string;

  likeCount: number;

  commentaryCount: number;
}
