import { User } from '../entities';

export interface ToggleReviewPin {
  handle: (postId: string, session?: User) => Promise<boolean>;
}
