import { ReplyModel } from '../models';

export interface IReplyRepository {
  getReplyById(replyId: string): Promise<ReplyModel | null>;
  createReply(
    userId: string,
    commentaryId: string,
    content: string,
  ): Promise<ReplyModel>;
  deleteReply(replyId: string): Promise<boolean>;
}
