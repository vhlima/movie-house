import { Post, Timestamps, User } from './index';

export class Commentary extends Timestamps {
  id: string;

  userId: string;

  user: User;

  postId: string;

  post: Post;

  content: string;
}
