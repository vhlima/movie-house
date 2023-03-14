import { User } from '../../domain/entities';

import { DeleteReply } from '../../domain/usecases';

import {
  AuthenticationError,
  NotFoundError,
  UnauthorizedError,
} from '../../domain/errors';

import { IReplyRepository } from '../contracts';

export class DeleteReplyService implements DeleteReply {
  constructor(private readonly replyRepository: IReplyRepository) {}

  async handle(replyId: string, session?: User | undefined): Promise<boolean> {
    if (!session) {
      throw new AuthenticationError();
    }

    const commentaryFound = await this.replyRepository.getReplyById(replyId);

    if (!commentaryFound) {
      throw new NotFoundError('ReplyNotFoundError', 'Reply not found.');
    }

    if (commentaryFound.userId !== session.id) {
      throw new UnauthorizedError();
    }

    await this.replyRepository.deleteReply(replyId);

    return true;
  }
}
