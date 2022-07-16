import type { MovieResponse } from './movie';

import type { UserResponse } from './user';

import type { CommentaryResponse } from './commentary';

export interface ReviewInput {
  body: string;
}

export interface ReviewResponse {
  _id: string;
  author: UserResponse;
  movie: MovieResponse;
  body: string;
  likeCount: number;
  commentaries: CommentaryResponse[];
}
