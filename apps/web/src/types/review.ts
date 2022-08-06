import type { MovieResponse } from './movie';

import type { UserResponse } from './user';

import type { CommentaryResponse } from './commentary';

import type { CreatedAndUpdatedAt } from './timestamps';

export interface ReviewInput {
  body: string;
}

export interface ReviewResponse extends CreatedAndUpdatedAt {
  _id: string;
  author: UserResponse;
  movie: MovieResponse;
  body: string;
  likeCount: number;
  commentaries: CommentaryResponse[];
}
