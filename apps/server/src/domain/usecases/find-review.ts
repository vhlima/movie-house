import { Review } from '../entities';

export interface FindReview {
  handle: (postId: string) => Promise<Review | null>;
}
