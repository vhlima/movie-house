import { Commentary, User } from '../entities';

export interface CreateCommentary {
  handle: (
    postId: string,
    content: string,
    session?: User,
  ) => Promise<Commentary>;
}
