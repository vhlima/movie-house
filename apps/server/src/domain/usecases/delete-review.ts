import { User } from '../entities';

export interface DeleteReview {
  handle: (postId: string, session?: User) => Promise<boolean>;
}
