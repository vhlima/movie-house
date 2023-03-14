import type { IReplyRepository } from '../../data/contracts';

import { PostgresDataSource } from '../data-sources';

import { Reply } from '../../domain/entities';

import { ReplyEntity } from '../entities';

export class ReplyRepository implements IReplyRepository {
  private getReplyRepository() {
    return PostgresDataSource.getRepository(ReplyEntity);
  }

  async getReplyById(replyId: string): Promise<Reply | null> {
    const replyRepository = this.getReplyRepository();

    const replyFound = await replyRepository.findOneBy({
      id: replyId,
    });

    return replyFound;
  }

  async createReply(
    userId: string,
    commentaryId: string,
    content: string,
  ): Promise<Reply> {
    const replyRepository = this.getReplyRepository();

    const reply = replyRepository.create({
      userId,
      commentaryId,
      content,
    });

    await replyRepository.save(reply);

    return reply;
  }

  async deleteReply(replyId: string): Promise<boolean> {
    const replyRepository = this.getReplyRepository();

    await replyRepository.delete({
      id: replyId,
    });

    return true;
  }
}
