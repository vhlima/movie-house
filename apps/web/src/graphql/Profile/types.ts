import type { ReviewData } from '../Review/types';

export interface FindUserProfileResponse {
  userProfile: {
    followerCount: number;
    followingCount: number;

    listCount: number;

    moviesWatchedCount: number;
    moviesWatchedThisYearCount: number;
  };
}

export interface FindUserProfileInput {
  userId: string;
}

export interface PinReviewResponse {
  pinReview: ReviewData;
}

export interface PinReviewInput {
  reviewId: string;
}
