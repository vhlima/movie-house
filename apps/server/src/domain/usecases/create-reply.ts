import { Reply, User } from '../entities';

export interface CreateReply {
  handle: (
    commentaryId: string,
    content: string,
    session?: User,
  ) => Promise<Reply>;
}
