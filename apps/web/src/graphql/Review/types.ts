import type { MovieData } from '../Movie/types';

import type { UserData } from '../User/types';

import type CreatedAndUpdatedAt from '../timestamps';

export interface ReviewInput {
  movieId: string;
  body: string;
}

export interface ReviewData extends CreatedAndUpdatedAt {
  id: string;
  author: UserData;
  movie: MovieData;
  body: string;
  likeCount: number;
  commentaryCount: number;
}

export interface ReviewResponse {
  review: ReviewData;
}

export interface CreateReviewResponse {
  createReview: ReviewResponse;
}

export interface FindLatestReviewsResponse {
  latestReviews: ReviewData[];
}

export interface FindLatestReviewsInput {
  userId: string;
}
