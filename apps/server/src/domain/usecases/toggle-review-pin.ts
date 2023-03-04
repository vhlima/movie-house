import { User } from '../entities';

export interface ToggleReviewPin {
  handle: (reviewId: string, session?: User) => Promise<boolean>;
}
