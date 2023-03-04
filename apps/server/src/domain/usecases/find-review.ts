import { Review } from '../entities';

export interface FindReview {
  handle: (reviewId: string) => Promise<Review | null>;
}
