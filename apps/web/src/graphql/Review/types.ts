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
  pinned?: boolean;
  commentaryCount: number;
  likes: UserData[];
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

export interface FindPinnedReviewsResponse {
  pinnedReviews: ReviewData[];
}

export interface FindPinnedReviewsInput {
  userId: string;
}

export interface PinReviewResponse {
  pinReview: boolean;
}

export interface UnpinReviewResponse {
  pinReview: boolean;
}

export interface PinReviewInput {
  reviewId: string;
}

export interface FindReviewsResponse {
  reviews: ReviewData[];
}

export interface FindReviewsInput {
  userId: string;
}
