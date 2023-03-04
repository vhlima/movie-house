import { Movie } from './movie';

import { Post } from './post';
import { User } from './user';

export class Review {
  id: string;

  postId: string;

  post: Post;

  user: User;

  movieId: number;

  movie: Movie;

  isPinned?: boolean;
}
