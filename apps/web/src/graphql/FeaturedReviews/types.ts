import type { ReviewData } from '../Review/types';

export interface FindFeaturedReviewsResponse {
  featuredReviews: {
    pinnedReviews: ReviewData[];
    recentReviews: ReviewData[];
    popularReviews: ReviewData[];
  };
}

export interface FindFeaturedReviewsInput {
  userId: string;
}
