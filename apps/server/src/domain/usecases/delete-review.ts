import { User } from '../entities';

export interface DeleteReview {
  handle: (reviewId: string, session?: User) => Promise<boolean>;
}
