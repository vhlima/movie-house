import { Post } from './post';

export class List {
  id: string;

  name: string;

  postId: string;

  post: Post;

  backgroundImageUrl?: string;

  isPrivate?: boolean;
}
