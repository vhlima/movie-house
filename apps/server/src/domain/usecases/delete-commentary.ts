import { User } from '../entities';

export interface DeleteCommentary {
  handle: (commentaryId: string, session?: User) => Promise<boolean>;
}
