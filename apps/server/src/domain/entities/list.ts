import { Post } from './post';
import { User } from './user';

export class List {
  id: string;

  name: string;

  postId: string;

  post: Post;

  user: User;

  movieCount: number;

  backgroundImageUrl?: string;

  isPrivate?: boolean;
}
