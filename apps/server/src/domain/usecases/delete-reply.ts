import { User } from '../entities';

export interface DeleteReply {
  handle: (replyId: string, session?: User) => Promise<boolean>;
}
