import { Movie } from './movie';

import { Post } from './post';

export class Review {
  id: string;

  postId: string;

  post: Post;

  movieId: number;

  movie: Movie;

  isPinned?: boolean;
}
